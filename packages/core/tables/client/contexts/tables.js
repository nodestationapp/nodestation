import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo } from "react";

import { api } from "@nstation/design-system/utils";
import { PageLoader } from "@nstation/design-system";

const TablesContext = createContext();

const TablesProvider = ({ children }) => {
  const { isLoading: loading, data: tables } = useQuery({
    queryKey: ["client_tables"],
    queryFn: () => api.get("/tables/all"),
  });

  const { isLoading: preferencesLoading, data: preferences } = useQuery({
    queryKey: ["client_tables_preferences"],
    queryFn: () => api.get("/preferences"),
  });

  const value = useMemo(() => {
    return {
      tables,
      loading,
      preferences,
      preferencesLoading,
    };
    // eslint-disable-next-line
  }, [tables, loading, preferences, preferencesLoading]);

  if (!!loading || !!preferencesLoading) return <PageLoader />;

  return (
    <TablesContext.Provider value={value}>{children}</TablesContext.Provider>
  );
};

const useTables = () => useContext(TablesContext);
export { TablesContext, useTables };
export default TablesProvider;
