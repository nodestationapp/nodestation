import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo } from "react";

import api from "libs/api";

const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
  const { isLoading: loading, data: system_metrics } = useQuery({
    queryKey: ["client_system_metrics"],
    queryFn: () => api.get("/system/metrics"),
  });

  const value = useMemo(() => {
    return { system_metrics, loading };
    // eslint-disable-next-line
  }, [system_metrics, loading]);

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

const useDashboard = () => useContext(DashboardContext);
export { DashboardContext, useDashboard };
export default DashboardProvider;
