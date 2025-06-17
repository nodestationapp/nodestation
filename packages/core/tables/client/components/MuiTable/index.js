import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import Toolbar from "./components/Toolbar/index.js";

let timer;

const MuiTable = ({
  columns,
  rows,
  loading,
  views,
  action,
  pagination,
  saveTransaction,
  selectActions,
  onRowClick,
  rowHeight = 42,
  noAddTab,
  sort,
  setSort,
  filters,
  setFilters,
  hideToolbar,
  columnSizes,
  setColumnSizes,
  columnVisibility,
  setColumnVisibility,
  tableHeight = "unset",
}) => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const page = queryParams.get("page");

  const tabs = !!views?.length
    ? views?.map((view) => ({
        title: view.name,
        href: `${pathname}${view.id ? `?v=${view.id}` : ""}`,
        last_viewed: view.last_viewed,
      }))
    : [];

  const [selectedRows, setSelectedRows] = useState([]);

  const onColumnResize = (params) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      let temp = { ...columnSizes };
      temp[params.colDef?.field] = params.width;

      setColumnSizes(temp);

      saveTransaction({ content: temp });
    }, 300);
  };

  const onColumnVisibilityChange = (params) => {
    setColumnVisibility(params);
    saveTransaction({ visibility: params });
  };

  const onSortModelChange = (params) => {
    setSort(params);
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

    setFilters(filters || []);
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      {!hideToolbar && (
        <Toolbar
          tabs={tabs}
          action={action}
          loading={loading}
          noAddTab={noAddTab}
          selectedRows={selectedRows}
          selectActions={selectActions}
        />
      )}
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          height: tableHeight,
        }}
      >
        <DataGrid
          pagination
          rows={rows || []}
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
          sortModel={sort || []}
          onSortModelChange={onSortModelChange}
          filterMode="server"
          sortingMode="server"
          paginationMode="server"
          filterModel={
            !!filters
              ? {
                  items: filters,
                }
              : undefined
          }
          onFilterModelChange={onFilterModelChange}
          rowCount={pagination?.count || 0}
          paginationModel={{
            page: parseInt(page || 0),
            pageSize: pagination?.pageSize || 20,
          }}
          onPaginationModelChange={onPaginationModelChange}
          pageSizeOptions={[20]}
          rowHeight={rowHeight}
          disableRowSelectionOnClick
          columnHeaderHeight={42}
          onRowSelectionModelChange={setSelectedRows}
          rowSelectionModel={selectedRows}
          slotProps={{
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
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
    </Box>
  );
};

export default MuiTable;
