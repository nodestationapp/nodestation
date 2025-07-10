import "./styles.scss";

import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import Toolbar from "./components/Toolbar/index.js";

let timer;

const MuiTable = ({
  sort,
  rows,
  views,
  action,
  filters,
  columns,
  loading,
  pagination,
  saveTransaction,
  selectActions,
  onRowClick,
  rowHeight = 42,
  noAddTab,
  setSort,
  setFilters,
  hideToolbar,
  columnSizes,
  setColumnSizes,
  isRowSelectable,
  columnVisibility,
  setColumnVisibility,
  tableHeight = "100%",
}) => {
  const { pathname } = useLocation();
  const [_, setSearchParams] = useSearchParams();

  const tabs = !!views?.length
    ? views?.map((view) => ({
        title: view.name,
        href: view?.href || `${pathname}${view.id ? `?v=${view.id}` : ""}`,
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

      if (!!saveTransaction) {
        saveTransaction({ content: temp });
      }
    }, 300);
  };

  const onColumnVisibilityChange = (params) => {
    setColumnVisibility(params);

    if (!!saveTransaction) {
      saveTransaction({ visibility: params });
    }
  };

  const onSortModelChange = (params) => {
    setSort(params);

    if (!!saveTransaction) {
      saveTransaction({ sort: params || [] });
    }
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

    if (!!saveTransaction) {
      saveTransaction({ filters });
    }
  };

  const onPaginationModelChange = (pagination) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      if (pagination?.page && pagination.page !== 0) {
        newParams.set("page", pagination.page);
      } else {
        newParams.delete("page");
      }

      return newParams;
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
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
          maxHeight: tableHeight,
        }}
      >
        <DataGrid
          pagination
          rows={rows || []}
          checkboxSelection
          loading={loading}
          columns={columns}
          isRowSelectable={isRowSelectable}
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
            page: parseInt(pagination?.page || 0),
            pageSize: pagination?.pageSize || 30,
          }}
          onPaginationModelChange={onPaginationModelChange}
          pageSizeOptions={[30]}
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
