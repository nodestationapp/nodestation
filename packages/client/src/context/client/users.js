import queryString from "query-string";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";

import api from "libs/api";
import sortParser from "libs/sortParser";
import { useOrganization } from "context/organization";

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const { preferences, loading: preferencesLoading } = useOrganization();
  const table_preferences = preferences?.find(
    (item) => item?.table_id === "users"
  );

  const [sort, setSort] = useState(table_preferences?.sort || []);
  const [filters, setFilters] = useState(
    table_preferences?.filters || [{ field: null, value: "" }]
  );

  const sort_query = sortParser(sort);
  const filters_query = filters.reduce((acc, item) => {
    if (item.field) {
      acc[item.field] = item.value || "";
    }
    return acc;
  }, {});

  const {
    data: users,
    refetch: usersRefetch,
    isLoading: users_loading,
  } = useQuery({
    queryKey: ["users", sort_query, filters_query],
    queryFn: () =>
      api.get(
        `/auth?${queryString.stringify({
          ...filters_query,
          sort: sort_query || undefined,
        })}`
      ),
    enabled: !!!preferencesLoading,
    placeholderData: (previousData) => previousData,
  });

  const { data: settings } = useQuery({
    queryKey: ["users_settings"],
    queryFn: () => api.get("/auth/settings"),
  });

  const { data: emails } = useQuery({
    queryKey: ["client_emails"],
    queryFn: () => api.get(`/emails`),
  });

  const updateAuth = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.put("/auth/settings", { ...values });

        queryClient.refetchQueries({
          queryKey: ["users"],
        });
        queryClient.refetchQueries({
          queryKey: ["users_settings"],
        });

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const deleteUsers = (id) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.delete(`/auth/${id}`);

        usersRefetch();

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const loading = !!users_loading;

  const value = useMemo(() => {
    return {
      users,
      settings,
      emails,
      loading,
      updateAuth,
      deleteUsers,
      sort,
      setSort,
      filters,
      setFilters,
    };
    // eslint-disable-next-line
  }, [users, settings, emails, loading, sort, filters]);

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

const useUsers = () => useContext(UsersContext);
export { UsersContext, useUsers };
export default UsersProvider;
