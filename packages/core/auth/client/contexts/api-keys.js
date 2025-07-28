import { createContext, useContext, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { api } from "@nstation/design-system/utils";

const ApiKeysContext = createContext();

const ApiKeysProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const addApiKey = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.post(`/admin-api/auth/api-key`, values);

        queryClient.refetchQueries(["tables", "nodestation_users_api_tokens"]);

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const value = useMemo(() => {
    return {
      addApiKey,
    };
    // eslint-disable-next-line
  }, []);

  return (
    <ApiKeysContext.Provider value={value}>{children}</ApiKeysContext.Provider>
  );
};

const useApiKeys = () => useContext(ApiKeysContext);
export { ApiKeysContext, useApiKeys };
export default ApiKeysProvider;
