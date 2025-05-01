import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Toolbar from "./components/Toolbar/index.js";

let timer;

const MuiTable = ({
  columns,
  rows,
  loading,
  views,
  action,
  pagination,
  preferences,
  saveTransaction,
  selectActions,
  onRowClick,
  rowHeight = 42,
}) => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const page = queryParams.get("page");

  const tabs = !!views?.length
    ? views?.map((view) => ({
        title: view.name,
        href: `${pathname}?v=${view.id}`,
      }))
    : [];

  const [columnVisibility, setColumnVisibility] = useState(
    preferences?.visibility
  );
  const [selectedRows, setSelectedRows] = useState([]);
  const [columnSort, setColumnSort] = useState(preferences?.sort);
  const [columnFilters, setColumnFilters] = useState(preferences?.filters);

  useEffect(() => {
    setColumnVisibility(preferences?.visibility || undefined);
    setColumnSort(preferences?.sort || []);
    setColumnFilters(preferences?.filters || []);
  }, [preferences?.id]);

  const onColumnResize = (params) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      let temp = { ...preferences?.content };
      temp[params.colDef?.field] = params.width;

      saveTransaction({ content: temp });
    }, 500);
  };

  const onColumnVisibilityChange = (params) => {
    setColumnVisibility(params);
    saveTransaction({ visibility: params });
  };

  const onSortModelChange = (params) => {
    setColumnSort(params);
    saveTransaction({ sort: params || [] });
  };

  const onFilterModelChange = (params) => {
    const filters = params?.items?.[0]?.field
      ? [
          {
            field: params?.items?.[0]?.field,
            operator: params?.items?.[0]?.operator,
            value: params?.items?.[0]?.value,
          },
        ]
      : null;

    setColumnFilters(filters || []);
    saveTransaction({ filters });
  };

  const onPaginationModelChange = (pagination) => {
    const params = new URLSearchParams(search);
    params.set("page", pagination?.page);

    navigate({
      pathname: pathname,
      search: params.toString(),
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Toolbar
        tabs={tabs}
        action={action}
        selectedRows={selectedRows}
        selectActions={selectActions}
      />
      <DataGrid
        pagination
        rows={rows}
        checkboxSelection
        loading={loading}
        columns={columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        onRowClick={onRowClick}
        filterDebounceMs={300}
        onColumnResize={onColumnResize}
        columnVisibilityModel={columnVisibility}
        onColumnVisibilityModelChange={onColumnVisibilityChange}
        sortingMode="server"
        sortModel={columnSort}
        onSortModelChange={onSortModelChange}
        filterMode="server"
        filterModel={
          !!columnFilters
            ? {
                items: columnFilters,
              }
            : undefined
        }
        onFilterModelChange={onFilterModelChange}
        paginationMode="server"
        rowCount={pagination?.count}
        paginationModel={{
          page: parseInt(page || 0),
          pageSize: pagination?.pageSize,
        }}
        onPaginationModelChange={onPaginationModelChange}
        pageSizeOptions={[]}
        rowHeight={rowHeight}
        disableRowSelectionOnClick
        columnHeaderHeight={42}
        onRowSelectionModelChange={setSelectedRows}
        rowSelectionModel={selectedRows}
        slotProps={{
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: {
                variant: "outlined",
                size: "small",
              },
              columnInputProps: {
                variant: "outlined",
                size: "small",
                sx: { mt: "auto" },
              },
              operatorInputProps: {
                variant: "outlined",
                size: "small",
                sx: { mt: "auto" },
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: "outlined",
                  size: "small",
                },
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default MuiTable;
