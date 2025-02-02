import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import api from "libs/api";
import { useApp } from "./app";

const OrganizationContext = createContext();

const OrganizationProvider = ({ children }) => {
  const { socket } = useApp();

  const [add_table_modal, setAddTableModal] = useState(false);
  const [terminal, setTerminal] = useState(null);
  const [terminal_content, setTerminalContent] = useState("");
  const [minimizeItems, setMinimizeItems] = useState(
    !!localStorage.getItem("minimize_items")
      ? JSON.parse(localStorage.getItem("minimize_items"))
      : []
  );

  const { data: server, refetch: serverRefetch } = useQuery({
    queryKey: ["server"],
    queryFn: () => api.get("/server"),
  });

  const { data: tables = [], refetch: refetchTables } = useQuery({
    queryKey: ["tables"],
    queryFn: () => api.get("/tables"),
  });

  const { data: preferences = [], isLoading: loading } = useQuery({
    queryKey: ["preferences"],
    queryFn: () => api.get("/preferences"),
  });

  useEffect(() => {
    if (!!!server?.terminal) return;
    const text = `${server?.terminal?.trim()}\n\r`;

    terminal?.write(text);
    setTerminalContent((prev) => prev + text);
    // eslint-disable-next-line
  }, [server?.terminal]);

  useEffect(() => {
    if (!!!socket) return;

    socket?.on("serverRefetch", () => {
      serverRefetch();
    });

    // eslint-disable-next-line
  }, [socket]);

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
      server,
      serverRefetch,
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
    server,
    terminal,
    terminal_content,
    preferences,
    loading,
  ]);

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
};

const useOrganization = () => useContext(OrganizationContext);
export { OrganizationContext, useOrganization };
export default OrganizationProvider;
