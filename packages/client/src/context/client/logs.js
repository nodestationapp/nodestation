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
  } = useInfiniteQuery({
    queryKey: ["client_logs"],
    queryFn: ({ pageParam = 1 }) => api.get(`/logs?page=${pageParam}`),
    getNextPageParam: (lastPage) => lastPage.nextPage || null,
  });

  const combinedLogs = !!data ? data.pages.flatMap((page) => page.items) : [];

  const value = useMemo(() => {
    return {
      logs: combinedLogs,
      isFetchingNextPage,
      fetchNextPage,
      loading,
    };
    // eslint-disable-next-line
  }, [data?.pages?.[0]?.items, isFetchingNextPage, loading]);

  return <LogsContext.Provider value={value}>{children}</LogsContext.Provider>;
};

const useLogs = () => useContext(LogsContext);
export { LogsContext, useLogs };
export default LogsProvider;
