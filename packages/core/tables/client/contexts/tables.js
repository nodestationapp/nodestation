import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useMemo } from "react";

import api from "libs/api";
import { useLocation } from "react-router-dom";

const TablesContext = createContext();

const TablesProvider = ({ children }) => {
  const { pathname } = useLocation();

  const { isLoading: loading, data: tables } = useQuery({
    queryKey: ["client_tables"],
    queryFn: () => api.get("/admin/api/tables"),
  });

  const value = useMemo(() => {
    return { tables, loading };
    // eslint-disable-next-line
  }, [tables, loading]);

  return (
    <TablesContext.Provider value={value}>{children}</TablesContext.Provider>
  );
};

const useTables = () => useContext(TablesContext);
export { TablesContext, useTables };
export default TablesProvider;
