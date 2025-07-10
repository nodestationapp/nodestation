import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo } from "react";

import { api } from "@nstation/design-system/utils";

const LoggerContext = createContext();

const LoggerProvider = ({ children }) => {
  const {
    isLoading: loading,
    data: logger_settings,
    refetch: refetchLoggerSettings,
  } = useQuery({
    queryKey: ["logger_settings"],
    queryFn: () => api.get("/admin-api/logger/settings"),
  });

  const updateLoggerSettings = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.put(`/admin-api/logger/settings`, { ...values });

        refetchLoggerSettings();

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const value = useMemo(() => {
    return {
      logger_settings,
      loading,
      updateLoggerSettings,
    };
    // eslint-disable-next-line
  }, [logger_settings, loading]);

  return (
    <LoggerContext.Provider value={value}>{children}</LoggerContext.Provider>
  );
};

const useLogger = () => useContext(LoggerContext);
export { LoggerContext, useLogger };
export default LoggerProvider;
