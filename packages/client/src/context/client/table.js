import { useQuery } from "@tanstack/react-query";
import queryString from "query-string";

import { useLocation } from "react-router-dom";
import { createContext, useContext, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import api from "libs/api";

const TableContext = createContext();

const TableProvider = ({ id, children }) => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const view = searchParams.get("v");

  const type = pathname?.split("/")?.[1];

  const {
    data,
    isLoading: loading,
    refetch: tableRefetch,
  } = useQuery({
    queryKey: ["tables", id, view],
    queryFn: () =>
      api.get(
        `/tables/${id}?${queryString.stringify({
          view,
        })}`
      ),
  });

  const updateTable = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.put(`/tables/${id}`, {
          ...values,
          type: data?.table?.type || type,
        });

        tableRefetch();

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const deleteTable = () =>
    new Promise(async (resolve, reject) => {
      try {
        await api.delete(`/tables/${id}`);

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const addTableEntry = (formData) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.post(`/tables/${id}/entry`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        tableRefetch();

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const updateTableEntry = (entry_id, values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.put(`/tables/${id}/entry/${entry_id}`, values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        tableRefetch();

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const deleteTableEntries = (entry_id) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.delete(`/tables/${id}/entry/${entry_id}`);

        tableRefetch();

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const saveTableTransaction = async (values) => {
    await api.post("/preferences", {
      table_id: id,
      view,
      ...values,
    });

    tableRefetch();
  };

  const value = useMemo(() => {
    return {
      data,
      id,
      type,
      view,
      loading,
      updateTable,
      updateTableEntry,
      deleteTable,
      addTableEntry,
      deleteTableEntries,
      saveTableTransaction,
    };
    // eslint-disable-next-line
  }, [data, id, loading, view]);

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

const useTable = () => useContext(TableContext);
export { TableContext, useTable };
export default TableProvider;
