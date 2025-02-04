import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import api from "libs/api";
import sortParser from "libs/sortParser";
import { useOrganization } from "context/organization";

const TableContext = createContext();

const TableProvider = ({ children }) => {
  const { id } = useParams();

  const { preferences, loading: preferencesLoading } = useOrganization();
  const table_preferences = preferences?.find((item) => item?.table_id === id);

  const [columnOrder, setColumnOrder] = useState(
    table_preferences?.order || null
  );
  const [columnVisibility, setColumnVisibility] = useState(
    table_preferences?.visibility || []
  );
  const [sort, setSort] = useState(table_preferences?.sort || []);

  const sort_query = sortParser(sort);

  useEffect(() => {
    setSort(table_preferences?.sort);
  }, [table_preferences?.sort]);

  const {
    isLoading: loading,
    data,
    refetch: tableRefetch,
  } = useQuery({
    queryKey: ["tables", id, sort_query],
    queryFn: () => api.get(`/tables/${id}?sort=${sort_query}`),
    enabled: !!!preferencesLoading,
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
      sort,
      setSort,
      columnOrder,
      setColumnOrder,
      columnVisibility,
      setColumnVisibility,
    };
    // eslint-disable-next-line
  }, [data, id, loading, sort, columnOrder, columnVisibility]);

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

const useTable = () => useContext(TableContext);
export { TableContext, useTable };
export default TableProvider;
