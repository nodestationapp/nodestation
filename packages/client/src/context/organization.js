import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";

import api from "libs/api";

const OrganizationContext = createContext();

const OrganizationProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const [add_table_modal, setAddTableModal] = useState(false);

  const { data: tables = [], refetch: refetchTables } = useQuery({
    queryKey: ["tables"],
    queryFn: () => api.get("/tables"),
  });

  const {
    data: preferences = [],
    isLoading: loading,
    refetch: refetchPreferences,
  } = useQuery({
    queryKey: ["preferences"],
    queryFn: () => api.get("/preferences"),
  });

  const updatePreferences = (id) => {
    let temp = [...preferences];

    const table_id = temp?.find((item) => item?.id === id)?.table_id;

    queryClient.setQueryData(["preferences"], (oldData) => {
      if (!Array.isArray(oldData)) return oldData;

      return oldData.map((item) => {
        if (item.table_id === table_id) {
          return {
            ...item,
            last_viewed: item.id === id ? 1 : null,
          };
        }
        return item;
      });
    });
  };

  const value = useMemo(() => {
    return {
      tables,
      add_table_modal,
      setAddTableModal,
      refetchTables,
      preferences,
      loading,
      refetchPreferences,
      updatePreferences,
    };
    // eslint-disable-next-line
  }, [tables, add_table_modal, preferences, loading]);

  if (!!loading) return null;

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
};

const useOrganization = () => useContext(OrganizationContext);
export { OrganizationContext, useOrganization };
export default OrganizationProvider;
