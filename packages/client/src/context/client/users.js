import { createContext, useContext, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import api from "libs/api";

const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const {
    isLoading: users_loading,
    data: users,
    refetch: usersRefetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.get("/auth"),
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
    return { users, settings, emails, loading, updateAuth, deleteUsers };
    // eslint-disable-next-line
  }, [users, settings, emails, loading]);

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

const useUsers = () => useContext(UsersContext);
export { UsersContext, useUsers };
export default UsersProvider;
