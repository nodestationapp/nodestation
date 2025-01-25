import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo } from "react";

import api from "libs/api";

const TableContext = createContext();

const TableProvider = ({ children }) => {
  const { id } = useParams();

  const {
    isLoading: loading,
    data,
    refetch: tableRefetch,
  } = useQuery({
    queryKey: ["tables", id],
    queryFn: () => api.get(`/tables/${id}`),
  });

  const updateTable = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.put(`/tables/${id}`, { ...values });

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

  const deleteTableEntries = (entry_ids) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.delete(`/tables/${id}/entry`, {
          data: {
            entry_ids,
          },
        });

        tableRefetch();

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const value = useMemo(() => {
    return {
      data,
      id,
      loading,
      updateTable,
      updateTableEntry,
      deleteTable,
      addTableEntry,
      deleteTableEntries,
    };
    // eslint-disable-next-line
  }, [data, id, loading]);

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

const useTable = () => useContext(TableContext);
export { TableContext, useTable };
export default TableProvider;
