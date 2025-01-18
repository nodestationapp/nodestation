import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";

import api from "libs/api";

const HelpersContext = createContext();

const HelpersProvider = ({ children }) => {
  const [archive_modal, setArchiveModal] = useState(null);

  const { isLoading: loading, data: helpers } = useQuery({
    queryKey: ["client_helpers"],
    queryFn: () => api.get("/helpers"),
  });

  const formatted_helpers = helpers?.map(({ id, name }) => ({
    id,
    label: name,
    href: `/functions/${id}`,
  }));

  const value = useMemo(() => {
    return {
      helpers: formatted_helpers,
      loading,
      archive_modal,
      setArchiveModal,
    };
    // eslint-disable-next-line
  }, [helpers, loading, archive_modal]);

  return (
    <HelpersContext.Provider value={value}>{children}</HelpersContext.Provider>
  );
};

const useHelpers = () => useContext(HelpersContext);
export { HelpersContext, useHelpers };
export default HelpersProvider;
