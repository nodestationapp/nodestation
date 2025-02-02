import { createContext, useContext, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import api from "libs/api";
import { useOrganization } from "context/organization";
import sortParser from "libs/sortParser";

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const { preferences, loading: preferencesLoading } = useOrganization();
  const table_preferences = preferences?.find(
    (item) => item?.table_id === "users"
  );

  const [sort, setSort] = useState(table_preferences?.sort || []);

  const sort_query = sortParser(sort);

  const {
    isLoading: users_loading,
    data: users,
    refetch: usersRefetch,
  } = useQuery({
    queryKey: ["users", sort_query],
    queryFn: () => api.get(`/auth?sort=${sort_query}`),
    enabled: !!!preferencesLoading,
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
    };
    // eslint-disable-next-line
  }, [users, settings, emails, loading, sort]);

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

const useUsers = () => useContext(UsersContext);
export { UsersContext, useUsers };
export default UsersProvider;
