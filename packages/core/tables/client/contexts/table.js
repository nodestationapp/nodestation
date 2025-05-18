import queryString from "query-string";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { api } from "@nstation/design-system/utils";

const TableContext = createContext();

const TableProvider = ({ id, extendable = false, children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const view = searchParams.get("v");
  const page = searchParams.get("page");

  let type = pathname?.split("/")?.[1];
  type = type !== "authentication" ? type : undefined;

  const { data: preferences = [] } = useQuery({
    queryKey: ["preferences", id],
    queryFn: () => api.get(`/preferences/${id}`),
  });

  useEffect(() => {
    if (!preferences?.length) return;

    const table_preference =
      preferences?.find((item) => item?.table_id === id && !!item?.last_viewed)
        ?.id || preferences?.find((item) => item?.table_id === id)?.id;

    if (!pathname?.includes("/settings")) {
      navigate(`${pathname}?v=${table_preference}`);
    }
    // eslint-disable-next-line
  }, [preferences?.length]);

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

        await api.put(`/tables/${id}?extendable=${extendable}`, values);

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

  const addTableEntry = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.post(`/tables/${id}/entry`, values);

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
      tableRefetch,
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
