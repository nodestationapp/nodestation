import queryString from "query-string";
import { useLocation, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { api } from "@nstation/design-system/utils";
import { useTables } from "./tables.js";

const TableContext = createContext();

const TableProvider = ({ id, extendable = false, children }) => {
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const { tables, preferences } = useTables();

  const view = searchParams.get("v");
  const page = searchParams.get("page");

  let type = pathname?.split("/")?.[1];
  type = type !== "authentication" ? type : undefined;

  const table_views = preferences?.filter((item) => item?.table_id === id);
  const table = tables?.find((item) => item?.tableName === id);
  const table_preferences = table_views?.find((item) =>
    !!view ? item?.id === view : !!item?.last_viewed
  );

  const [init, setInit] = useState(false);
  const [currentView, setView] = useState(table_preferences?.id);
  const [sort, setSort] = useState(table_preferences?.sort || []);
  const [filters, setFilters] = useState(table_preferences?.filters || []);
  const [pagination_page, setPaginationPage] = useState(0);
  const [columnVisibility, setColumnVisibility] = useState(
    table_preferences?.visibility || {}
  );
  const [columnSizes, setColumnSizes] = useState(
    table_preferences?.content || {}
  );

  useEffect(() => {
    if (!init) {
      setInit(true);
      return;
    }

    setSort(table_preferences?.sort || []);
    setFilters(table_preferences?.filters || []);
    setColumnSizes(table_preferences?.content || {});
    setColumnVisibility(table_preferences?.visibility || {});
    setView(table_preferences?.id);

    queryClient.setQueryData(["client_tables_preferences"], (prev) => {
      let temp = [...prev];

      temp.forEach((item) => {
        if (item?.table_id === id) {
          if (item?.id === table_preferences?.id) {
            item.last_viewed = 1;
          } else {
            item.last_viewed = 0;
          }
        }
      });

      return temp;
    });
  }, [table_preferences?.id]);

  const {
    data,
    isLoading: loading,
    refetch: tableRefetch,
  } = useQuery({
    queryKey: ["tables", currentView, sort, filters, page],
    queryFn: () =>
      api.get(
        `/admin-api/tables/${id}?${queryString.stringify({
          view,
          page,
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
        let temp = { ...values };
        temp?.fields?.forEach((item) => {
          if (!!item?.relation) {
            item.relation = item?.relation?.table;
          }
        });

        await api.put(`/admin-api/tables/${id}?extendable=${extendable}`, temp);

        tableRefetch();

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const deleteTable = () =>
    new Promise(async (resolve, reject) => {
      try {
        await api.delete(`/admin-api/tables/${id}`);

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const addTableEntry = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.post(`/admin-api/tables/${id}/entry`, values);

        tableRefetch();

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const updateTableEntry = (entry_id, values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.put(`/admin-api/tables/${id}/entry/${entry_id}`, values, {
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
        await api.delete(`/admin-api/tables/${id}/entry/${entry_id}`);

        tableRefetch();

        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const saveTableTransaction = (values) => {
    api.post("/admin-api/preferences", {
      view,
      table_id: id,
      ...values,
    });

    queryClient.setQueryData(["client_tables_preferences"], (prev) => {
      let temp = [...prev];

      if (
        values?.hasOwnProperty("content") ||
        values?.hasOwnProperty("visibility")
      ) {
        temp.forEach((item) => {
          if (item?.table_id === id) {
            item.content = values?.content || item?.content;
            item.visibility = values?.visibility || item?.visibility;
          }
        });

        return prev;
      } else {
        const index = preferences?.findIndex((item) => item?.id === view);

        temp[index] = {
          ...temp[index],
          ...values,
        };
      }

      return temp;
    });
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
      loading,
      filters,
      columnSizes,
      columnVisibility,
      setColumnVisibility,
      setColumnSizes,
      setFilters,
      setSort,
      updateTable,
      tableRefetch,
      updateTableEntry,
      deleteTable,
      addTableEntry,
      deleteTableEntries,
      saveTableTransaction,
      pagination_page,
      setPaginationPage,
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
    columnSizes,
    columnVisibility,
    pagination_page,
  ]);

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

const useTable = () => useContext(TableContext);
export { TableContext, useTable };
export default TableProvider;
