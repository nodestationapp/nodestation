import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useMemo } from "react";

import api from "libs/api";

const EndpointContext = createContext();

const EndpointProvider = ({ children }) => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { isLoading: endpoints_loading, data: endpoint } = useQuery({
    queryKey: ["client_endpoints", id],
    queryFn: () => api.get(`/endpoints/${id}`),
    enabled: id !== "new",
  });

  const { data: middlewares } = useQuery({
    queryKey: ["client_middlewares"],
    queryFn: () => api.get(`/middlewares`),
  });

  const createEndpoint = (values) =>
    new Promise(async (resolve, reject) => {
      let formatted_path = values?.path;

      const index = formatted_path.indexOf("/");
      if (index !== -1) {
        formatted_path =
          formatted_path.slice(0, index) + formatted_path.slice(index + 1);
      }

      try {
        await api.post("/endpoints", {
          ...values,
          path: formatted_path,
        });

        queryClient.refetchQueries({
          queryKey: ["client_endpoints"],
        });

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const updateEndpoint = (values) =>
    new Promise(async (resolve, reject) => {
      let formatted_path = values?.path;
      const formatted_middlewares = !!values?.middlewares
        ? [values?.middlewares]
        : [];

      const index = formatted_path.indexOf("/");
      if (index !== -1) {
        formatted_path =
          formatted_path.slice(0, index) + formatted_path.slice(index + 1);
      }

      try {
        await api.put(`/endpoints/${id}`, {
          ...values,
          path: formatted_path,
          middlewares: formatted_middlewares,
        });

        queryClient.setQueryData(["client_endpoints", id], (prev) => ({
          ...prev,
          ...values,
          path: formatted_path,
          middlewares: formatted_middlewares,
        }));

        queryClient.refetchQueries({
          queryKey: ["client_endpoints"],
        });

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const loading = !!endpoints_loading;

  let formatted_middlewares = middlewares?.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));
  formatted_middlewares?.unshift({ label: "Empty", value: "" });

  const value = useMemo(() => {
    return {
      current_endpoint: endpoint,
      middlewares: formatted_middlewares,
      loading,
      createEndpoint,
      updateEndpoint,
    };
    // eslint-disable-next-line
  }, [endpoint, middlewares, loading]);

  return (
    <EndpointContext.Provider value={value}>
      {children}
    </EndpointContext.Provider>
  );
};

const useEndpoint = () => useContext(EndpointContext);
export { EndpointContext, useEndpoint };
export default EndpointProvider;
