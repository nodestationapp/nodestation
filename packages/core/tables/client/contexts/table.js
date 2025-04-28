import queryString from "query-string";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import api from "libs/api";
import { useAuth } from "@nstation/core/auth/client/contexts/authMiddleware.js";

const TableContext = createContext();

const TableProvider = ({ id, children }) => {
  const navigate = useNavigate();
  const { pathname, query } = useLocation();
  const [searchParams] = useSearchParams();
  // const { preferences } = useAuth();

  const view = searchParams.get("v");
  const page = searchParams.get("page");

  let type = pathname?.split("/")?.[1];
  type = type !== "authentication" ? type : undefined;

  const { data: preferences = [] } = useQuery({
    queryKey: ["preferences"],
    queryFn: () => api.get("/preferences"),
  });

  useEffect(() => {
    const table_preference =
      preferences?.find((item) => item?.table_id === id && !!item?.last_viewed)
        ?.id || preferences?.find((item) => item?.table_id === id)?.id;

    if (!pathname?.includes("/settings") && !!!view) {
      navigate(`${pathname}?v=${table_preference}`);
    }
    // eslint-disable-next-line
  }, []);

  const {
    data,
    isLoading: loading,
    refetch: tableRefetch,
  } = useQuery({
    queryKey: ["tables", id, view, page],
    queryFn: () =>
      api.get(
        `/tables/${id}?${queryString.stringify({
          view,
          type,
          page: parseInt(page || 0),
        })}`
      ),
    enabled: !!view || pathname?.includes("/settings"),
    placeholderData: (prev) => prev,
  });

  const updateTable = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        if (type === "authentication") {
          delete values?.name;
        }

        await api.put(`/tables/${id}`, values);

        tableRefetch();

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const deleteTable = () =>
    new Promise(async (resolve, reject) => {
      try {
        await api.delete(
          `/tables/${id}?${queryString.stringify({
            type,
          })}`
        );

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
