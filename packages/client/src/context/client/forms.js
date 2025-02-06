import { createContext, useContext, useMemo, useState } from "react";

import api from "libs/api";
import { useQuery } from "@tanstack/react-query";

const FormsContext = createContext();

const FormsProvider = ({ children }) => {
  const [archive_modal, setArchiveModal] = useState(false);

  const { isLoading: loading, data: forms } = useQuery({
    queryKey: ["forms"],
    queryFn: () => api.get("/forms"),
    placeholderData: (previousData) => previousData,
  });

  const value = useMemo(() => {
    return { forms, loading, archive_modal, setArchiveModal };
    // eslint-disable-next-line
  }, [forms, loading, archive_modal, setArchiveModal]);

  return (
    <FormsContext.Provider value={value}>{children}</FormsContext.Provider>
  );
};

const useForms = () => useContext(FormsContext);
export { FormsContext, useForms };
export default FormsProvider;
