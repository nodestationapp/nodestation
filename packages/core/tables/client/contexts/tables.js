import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo } from "react";

import { api } from "@nstation/design-system/utils";
import { PageLoader } from "@nstation/design-system";

const TablesContext = createContext();

const TablesProvider = ({ children }) => {
  const { isLoading: loading, data: tables } = useQuery({
    queryKey: ["client_tables"],
    queryFn: () => api.get("/admin-api/tables/all"),
  });

  const {
    isLoading: preferencesLoading,
    data: preferences,
    refetch: refetchPreferences,
  } = useQuery({
    queryKey: ["client_tables_preferences"],
    queryFn: () => api.get("/admin-api/preferences"),
  });

  const value = useMemo(() => {
    return {
      tables,
      loading,
      preferences,
      refetchPreferences,
      preferencesLoading,
    };
    // eslint-disable-next-line
  }, [tables, loading, preferences, refetchPreferences, preferencesLoading]);

  if (!!loading || !!preferencesLoading) return <PageLoader />;

  return (
    <TablesContext.Provider value={value}>{children}</TablesContext.Provider>
  );
};

const useTables = () => useContext(TablesContext);
export { TablesContext, useTables };
export default TablesProvider;
