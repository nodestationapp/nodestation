import { useQuery } from "@tanstack/react-query";
import { api } from "@nstation/design-system/utils";
import queryString from "query-string";
import { useTables } from "#client/contexts/tables.js";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import tableColumnsRender from "#client/utils/tableColumnsRender.js";

export default (id) => {
  const { tables, preferences } = useTables();
  const [searchParams] = useSearchParams();

  let view = searchParams.get("v");
  const page = searchParams.get("page");

  const views = preferences?.filter((item) => item?.table_id === id);
  const table = tables?.find((item) => item?.tableName === id);
  const table_preferences = views?.find((item) =>
    !!view ? item?.id === view : !!item?.last_viewed
  );

  if (!view) {
    view = table_preferences?.id;
  }

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

  let columnsToShow = table?.fields || [];
  // columnsToShow = columnsToShow?.filter(
  //   (item) => !hiddenColumns.includes(item?.slug)
  // );
  columnsToShow = [...[], ...columnsToShow];

  const columns = tableColumnsRender({
    columns: columnsToShow,
    columnSizes,
  });

  const {
    data,
    isLoading: loading,
    // refetch: tableRefetch,
  } = useQuery({
    queryKey: [
      "tables",
      id,
      sort,
      filters,
      currentView,
      // id, currentView, sort, filters, page
    ],
    queryFn: () =>
      api.get(
        `/admin-api/tables/${id}?${queryString.stringify({
          view,
          page: page || 0,
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

  return { rows: data?.entries, columns, loading, views };
};
