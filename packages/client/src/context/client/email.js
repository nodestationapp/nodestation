import { createContext, useContext, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "libs/api";

const EmailContext = createContext();

const EmailProvider = ({ id: current_id, children }) => {
  const queryClient = useQueryClient();

  const [id, setId] = useState(current_id);

  const { isLoading: loading, data: email } = useQuery({
    queryKey: ["emails", id],
    queryFn: () => api.get(`/emails/${id}`),
    enabled: id !== "new",
  });

  const createEmail = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        const id = await api.post(`/emails`, { ...values });

        setId(id);

        queryClient.refetchQueries({
          queryKey: ["emails"],
        });

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const updateEmail = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.put(`/emails/${id}`, { ...values });

        queryClient.setQueryData(["emails", id], (prev) => ({
          ...prev,
          ...values,
        }));

        queryClient.refetchQueries({
          queryKey: ["emails"],
        });

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const value = useMemo(() => {
    return {
      email,
      loading,
      createEmail,
      updateEmail,
    };
    // eslint-disable-next-line
  }, [email, loading]);

  return (
    <EmailContext.Provider value={value}>{children}</EmailContext.Provider>
  );
};

const useEmail = () => useContext(EmailContext);
export { EmailContext, useEmail };
export default EmailProvider;
