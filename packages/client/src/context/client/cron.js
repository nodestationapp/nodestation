import { createContext, useContext, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import api from "libs/api";

const CronContext = createContext();

const CronProvider = ({ id: current_id, children }) => {
  const queryClient = useQueryClient();

  const [id, setId] = useState(current_id);

  const { isLoading: loading, data: cron } = useQuery({
    queryKey: ["client_crons", id],
    queryFn: () => api.get(`/crons/${id}`),
    enabled: id !== "new",
  });

  const createCron = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        const { id } = await api.post("/crons", {
          ...values,
        });

        setId(id);

        queryClient.refetchQueries({
          queryKey: ["client_crons"],
        });

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const updateCron = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.put(`/crons/${id}`, {
          ...values,
        });

        queryClient.setQueryData(["client_crons", id], (prev) => ({
          ...prev,
          ...values,
        }));

        queryClient.refetchQueries({
          queryKey: ["client_crons"],
        });

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const value = useMemo(() => {
    return {
      cron,
      loading,
      createCron,
      updateCron,
    };
    // eslint-disable-next-line
  }, [cron, loading]);

  return <CronContext.Provider value={value}>{children}</CronContext.Provider>;
};

const useCron = () => useContext(CronContext);
export { CronContext, useCron };
export default CronProvider;
