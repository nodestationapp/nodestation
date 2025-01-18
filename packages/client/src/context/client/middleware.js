import { createContext, useContext, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import api from "libs/api";

const MiddlewareContext = createContext();

const MiddlewareProvider = ({ id: current_id, children }) => {
  const queryClient = useQueryClient();

  const [id, setId] = useState(current_id);

  const { isLoading: loading, data: middleware } = useQuery({
    queryKey: ["client_middlewares", id],
    queryFn: () => api.get(`/middlewares/${id}`),
    enabled: id !== "new",
  });

  const createMiddleware = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        const { id } = await api.post("/middlewares", {
          ...values,
        });

        setId(id);

        queryClient.refetchQueries({
          queryKey: ["client_middlewares"],
        });

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const updateMiddleware = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.put(`/middlewares/${id}`, {
          ...values,
        });

        queryClient.setQueryData(["client_middleware", id], (prev) => ({
          ...prev,
          ...values,
        }));

        queryClient.refetchQueries({
          queryKey: ["client_middlewares"],
        });

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const value = useMemo(() => {
    return {
      middleware,
      loading,
      createMiddleware,
      updateMiddleware,
    };
    // eslint-disable-next-line
  }, [middleware, loading]);

  return (
    <MiddlewareContext.Provider value={value}>
      {children}
    </MiddlewareContext.Provider>
  );
};

const useMiddleware = () => useContext(MiddlewareContext);
export { MiddlewareContext, useMiddleware };
export default MiddlewareProvider;
