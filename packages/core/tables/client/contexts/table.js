import queryString from "query-string";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { api } from "@nstation/design-system/utils";
import { useTables } from "./tables.js";

const TableContext = createContext();

const TableProvider = ({ id, extendable = false, children }) => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const { tables, preferences } = useTables();
  const [save_loading, setSaveLoading] = useState(false);

  const view = searchParams.get("v");
  const page = searchParams.get("page");

  let type = pathname?.split("/")?.[1];
  type = type !== "authentication" ? type : undefined;

  const table_views = preferences?.filter((item) => item?.table_id === id);
  const table = tables?.find((item) => item?.tableName === id);
  const table_preferences = table_views?.find((item) =>
    !!view ? item?.id === view : !!item?.last_viewed
  );

  const [sort, setSort] = useState(table_preferences?.sort || []);
  const [filters, setFilters] = useState(table_preferences?.filters || []);

  const {
    data,
    isLoading: loading,
    refetch: tableRefetch,
  } = useQuery({
    queryKey: ["tables", id, view, page, sort, filters],
    queryFn: () =>
      api.get(
        `/tables/${id}?${queryString.stringify({
          view,
          page: parseInt(page || 0),
          sort: !!sort?.[0]
            ? `${sort?.[0]?.field}:${sort?.[0]?.sort}`
            : undefined,
          filters:
            filters
              ?.map((item) => `${item?.field}:${item?.operator}:${item?.value}`)
              ?.join(",") || undefined,
        })}`
      ),
  });

  const updateTable = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        delete values?.name;

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
    // setSaveLoading(true);

    await api.post("/preferences", {
      table_id: id,
      view,
      ...values,
    });

    // if (values?.sort) {
    //   await tableRefetch();
    // }

    setSaveLoading(false);
  };

  const value = useMemo(() => {
    return {
      data,
      id,
      view,
      views: table_views,
      preferences: table_preferences,
      table,
      sort,
      loading: loading || save_loading,
      filters,
      setFilters,
      setSort,
      updateTable,
      tableRefetch,
      updateTableEntry,
      deleteTable,
      addTableEntry,
      deleteTableEntries,
      saveTableTransaction,
    };
    // eslint-disable-next-line
  }, [
    data,
    id,
    loading,
    view,
    table_views,
    table_preferences,
    table,
    sort,
    filters,
  ]);

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

const useTable = () => useContext(TableContext);
export { TableContext, useTable };
export default TableProvider;
