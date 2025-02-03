import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";

import api from "libs/api";

const OrganizationContext = createContext();

const OrganizationProvider = ({ children }) => {
  const [add_table_modal, setAddTableModal] = useState(false);
  const [terminal, setTerminal] = useState(null);
  const [terminal_content, setTerminalContent] = useState("");
  const [minimizeItems, setMinimizeItems] = useState(
    !!localStorage.getItem("minimize_items")
      ? JSON.parse(localStorage.getItem("minimize_items"))
      : []
  );

  const { data: tables = [], refetch: refetchTables } = useQuery({
    queryKey: ["tables"],
    queryFn: () => api.get("/tables"),
  });

  const { data: preferences = [], isLoading: loading } = useQuery({
    queryKey: ["preferences"],
    queryFn: () => api.get("/preferences"),
  });

  const setMinimizeHandler = (id, label, extras) => {
    if (!minimizeItems?.find((item) => item?.id === id)) {
      const new_item = {
        id,
        label,
        extras,
      };

      setMinimizeItems((prev) => [...prev, new_item]);
      localStorage.setItem(
        "minimize_items",
        JSON.stringify([...minimizeItems, new_item])
      );
    }
  };

  const removeMinimizeHandler = (id) => {
    let temp = [...minimizeItems];
    const index = minimizeItems?.findIndex((item) => item?.id === id);
    if (index > -1) {
      temp?.splice(index, 1);
    }

    setMinimizeItems([...temp]);
    localStorage.setItem("minimize_items", JSON.stringify(temp));
  };

  const value = useMemo(() => {
    return {
      tables,
      add_table_modal,
      setAddTableModal,
      minimizeItems,
      setMinimizeItems,
      setMinimizeHandler,
      removeMinimizeHandler,
      terminal,
      setTerminal,
      terminal_content,
      setTerminalContent,
      refetchTables,
      preferences,
      loading,
    };
    // eslint-disable-next-line
  }, [
    tables,
    add_table_modal,
    minimizeItems,
    terminal,
    terminal_content,
    preferences,
    loading,
  ]);

  if (!!loading) return null;

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
};

const useOrganization = () => useContext(OrganizationContext);
export { OrganizationContext, useOrganization };
export default OrganizationProvider;
