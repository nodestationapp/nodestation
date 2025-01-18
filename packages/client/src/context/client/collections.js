import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo } from "react";

import api from "libs/api";

const CollectionsContext = createContext();

const CollectionsProvider = ({ children }) => {
  const { isLoading: loading, data: collections } = useQuery({
    queryKey: ["client_collections"],
    queryFn: () => api.get("/collections"),
  });

  const value = useMemo(() => {
    return { collections, loading };
    // eslint-disable-next-line
  }, [collections, loading]);

  return (
    <CollectionsContext.Provider value={value}>
      {children}
    </CollectionsContext.Provider>
  );
};

const useCollections = () => useContext(CollectionsContext);
export { CollectionsContext, useCollections };
export default CollectionsProvider;
