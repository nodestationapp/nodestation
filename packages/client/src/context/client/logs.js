import { useInfiniteQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo } from "react";

import api from "libs/api";

const LogsContext = createContext();

const LogsProvider = ({ children }) => {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: loading,
    refetch: tableRefetch,
  } = useInfiniteQuery({
    queryKey: ["client_logs"],
    queryFn: ({ pageParam = 1 }) => api.get(`/logs?page=${pageParam}`),
    getNextPageParam: (lastPage) => lastPage.nextPage || null,
  });

  const saveTableTransaction = async (values) => {
    await api.post("/preferences", {
      table_id: "logs",
      ...values,
    });

    tableRefetch();
  };

  const combinedLogs = !!data ? data.pages.flatMap((page) => page.items) : [];

  const value = useMemo(() => {
    return {
      logs: combinedLogs,
      preferences: data?.pages?.[0]?.preferences,
      isFetchingNextPage,
      fetchNextPage,
      loading,

      saveTableTransaction,
    };
    // eslint-disable-next-line
  }, [data, isFetchingNextPage, loading]);

  return <LogsContext.Provider value={value}>{children}</LogsContext.Provider>;
};

const useLogs = () => useContext(LogsContext);
export { LogsContext, useLogs };
export default LogsProvider;
