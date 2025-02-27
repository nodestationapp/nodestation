import queryString from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";

import api from "libs/api";
import { useOrganization } from "context/organization";

const LogsContext = createContext();

const LogsProvider = ({ children }) => {
  const { preferences, loading: preferencesLoading } = useOrganization();
  const table_preferences = preferences?.find(
    (item) => item?.table_id === "logs"
  );

  const [filters, setFilters] = useState(
    table_preferences?.filters || [{ field: null, value: "" }]
  );

  const filters_query = filters.reduce((acc, item) => {
    if (item.field) {
      acc[item.field] = Array.isArray(item.value)
        ? item?.value?.join(",") || undefined
        : item.value || undefined;
    }
    return acc;
  }, {});

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: loading,
  } = useInfiniteQuery({
    queryKey: ["client_logs", filters_query],
    queryFn: ({ pageParam = 1 }) =>
      api.get(
        `/logs?page=${pageParam}&${queryString.stringify({
          ...filters_query,
        })}`
      ),
    getNextPageParam: (lastPage) => lastPage.nextPage || null,
    enabled: !!!preferencesLoading,
  });

  const combinedLogs = !!data ? data.pages.flatMap((page) => page.items) : [];

  const value = useMemo(() => {
    return {
      logs: combinedLogs,
      isFetchingNextPage,
      fetchNextPage,
      loading,
      filters,
      setFilters,
    };
    // eslint-disable-next-line
  }, [data?.pages?.[0]?.items, isFetchingNextPage, loading, filters]);

  return <LogsContext.Provider value={value}>{children}</LogsContext.Provider>;
};

const useLogs = () => useContext(LogsContext);
export { LogsContext, useLogs };
export default LogsProvider;
