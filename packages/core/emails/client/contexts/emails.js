import { createContext, useContext, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import api from "../../../../client/src/utils/api.js";

const EmailsContext = createContext();

const EmailsProvider = ({ children }) => {
  const [archive_modal, setArchiveModal] = useState(null);

  const {
    isLoading: loading,
    data: emails,
    refetch: refetchEmails,
  } = useQuery({
    queryKey: ["emails"],
    queryFn: () => api.get("/emails"),
  });

  const {
    isLoading: settings_loading,
    data: email_settings,
    refetch: refetchEmailSettings,
  } = useQuery({
    queryKey: ["email_settings"],
    queryFn: () => api.get("/emails/settings"),
  });

  const addEmail = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.post(`/emails`, { ...values });

        refetchEmails();

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const deleteEmail = (id) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.delete(`/emails/${id}`);

        refetchEmails();

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const updateEmailSettings = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.put(`/emails/settings`, { ...values });

        refetchEmailSettings();

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const value = useMemo(() => {
    return {
      emails,
      loading,
      archive_modal,
      email_settings,
      settings_loading,
      setArchiveModal,
      refetchEmailSettings,
      refetchEmails,
      updateEmailSettings,
      addEmail,
      deleteEmail,
    };
    // eslint-disable-next-line
  }, [emails, email_settings, loading, archive_modal, settings_loading]);

  return (
    <EmailsContext.Provider value={value}>{children}</EmailsContext.Provider>
  );
};

const useEmails = () => useContext(EmailsContext);
export { EmailsContext, useEmails };
export default EmailsProvider;
