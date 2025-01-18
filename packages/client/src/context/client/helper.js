import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";

import api from "libs/api";

const HelperContext = createContext();

const HelperProvider = ({ id: current_id, children }) => {
  const queryClient = useQueryClient();

  const [id, setId] = useState(current_id);

  const { isLoading: loading, data: helper } = useQuery({
    queryKey: ["client_helpers", id],
    queryFn: () => api.get(`/helpers/${id}`),
    enabled: id !== "new",
  });

  const createHelper = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        const { id } = await api.post("/helpers", {
          ...values,
        });

        setId(id);

        queryClient.refetchQueries({
          queryKey: ["client_helpers"],
        });

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const updateHelper = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.put(`/helpers/${id}`, {
          ...values,
        });

        queryClient.setQueryData(["client_helpers", id], (prev) => ({
          ...prev,
          ...values,
        }));

        queryClient.refetchQueries({
          queryKey: ["client_helpers"],
        });

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const value = useMemo(() => {
    return {
      helper,
      loading,
      createHelper,
      updateHelper,
    };
    // eslint-disable-next-line
  }, [helper, loading]);

  return (
    <HelperContext.Provider value={value}>{children}</HelperContext.Provider>
  );
};

const useHelper = () => useContext(HelperContext);
export { HelperContext, useHelper };
export default HelperProvider;
