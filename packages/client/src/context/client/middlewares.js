import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";

import api from "libs/api";

const MiddlewaresContext = createContext();

const MiddlewaresProvider = ({ children }) => {
  const [archive_modal, setArchiveModal] = useState(null);

  const { isLoading: loading, data: middlewares } = useQuery({
    queryKey: ["client_middlewares"],
    queryFn: () => api.get("/middlewares"),
  });

  const formatted_middlewares = middlewares?.map(({ id, name }) => ({
    id,
    label: name,
    href: `/middlewares/${id}`,
  }));

  const value = useMemo(() => {
    return {
      middlewares: formatted_middlewares,
      loading,
      archive_modal,
      setArchiveModal,
    };
    // eslint-disable-next-line
  }, [middlewares, loading, archive_modal]);

  return (
    <MiddlewaresContext.Provider value={value}>
      {children}
    </MiddlewaresContext.Provider>
  );
};

const useMiddlewares = () => useContext(MiddlewaresContext);
export { MiddlewaresContext, useMiddlewares };
export default MiddlewaresProvider;
