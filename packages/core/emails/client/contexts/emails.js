import { createContext, useContext, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { api } from "@nstation/design-system/utils";
import { useSearchParams } from "react-router-dom";
import queryString from "query-string";
const EmailsContext = createContext();

const EmailsProvider = ({ children }) => {
  const [archive_modal, setArchiveModal] = useState(null);

  const [searchParams] = useSearchParams();

  const page = searchParams.get("page");
  const sort = searchParams.get("sort");

  const {
    isLoading: loading,
    data: emails,
    refetch: refetchEmails,
  } = useQuery({
    queryKey: ["emails", page, sort],
    queryFn: () =>
      api.get(
        `/admin-api/emails?${queryString.stringify({
          page: page || 0,
          pageSize: 20,
          sort,
        })}`
      ),
  });

  const {
    isLoading: settings_loading,
    data: email_settings,
    refetch: refetchEmailSettings,
  } = useQuery({
    queryKey: ["email_settings"],
    queryFn: () => api.get("/admin-api/emails/settings"),
  });

  const addEmail = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.post(`/admin-api/emails`, { ...values });

        refetchEmails();

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const deleteEmail = (id) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.delete(`/admin-api/emails/${id}`);

        refetchEmails();

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const updateEmailSettings = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.put(`/admin-api/emails/settings`, { ...values });

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
      sort,
    };
    // eslint-disable-next-line
  }, [emails, email_settings, loading, archive_modal, settings_loading, sort]);

  return (
    <EmailsContext.Provider value={value}>{children}</EmailsContext.Provider>
  );
};

const useEmails = () => useContext(EmailsContext);
export { EmailsContext, useEmails };
export default EmailsProvider;
