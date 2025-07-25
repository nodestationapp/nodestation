import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

import MuiTable from "../../components/MuiTable/index.js";
import TableRowEditor from "../../components/TableRowEditor/index.js";
import EntriesDeleteModal from "./components/EntriesDeleteModal/index.js";

import TableProvider, { useTable } from "../../contexts/table.js";
import tableColumnsRender from "../../utils/tableColumnsRender.js";

import AddIcon from "@mui/icons-material/Add";
import Settings from "@mui/icons-material/Settings";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

import { useSlot } from "contexts/slots.js";

const TableManagerContent = ({
  rowHeight,
  onNewClick,
  onRowClick,
  hideActions,
  hiddenColumns,
  appendColumns,
  onEntrySubmit,
}) => {
  const actionSlot = useSlot("tables.actions");

  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const type = queryParams.get("type");

  const {
    data,
    sort,
    views,
    table,
    loading,
    setSort,
    filters,
    preferences,
    pagination_page,
    setPaginationPage,
    setFilters,
    columnSizes,
    setColumnSizes,
    columnVisibility,
    setColumnVisibility,
    saveTableTransaction,
  } = useTable();
  const [content_editor, setContentEditor] = useState(null);
  const [entriesDeleteModal, setEntriesDeleteModal] = useState(false);

  let columnsToShow = table?.fields || [];
  columnsToShow = columnsToShow?.filter(
    (item) => !hiddenColumns.includes(item?.slug)
  );
  columnsToShow = [...appendColumns, ...columnsToShow];

  const columns = tableColumnsRender({
    columns: columnsToShow,
    columnSizes,
  });

  const action = () => (
    <>
      {actionSlot.map((item) => item(table))}
      <IconButton
        size="micro"
        sx={(theme) => ({
          "&.MuiIconButton-sizeMicro": {
            backgroundColor:
              type === "settings"
                ? alpha(theme.palette.action.selected, 0.1)
                : null,
          },
        })}
        onClick={() => navigate(`${pathname}/settings`)}
      >
        <Settings color={type === "settings" ? "primary" : ""} />
      </IconButton>
      <Button
        size="small"
        color="primary"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() =>
          onNewClick
            ? onNewClick()
            : setContentEditor(
                data?.table?.fields?.reduce((acc, item) => {
                  if (item?.slug === "id") {
                    item.default = "";
                  }

                  acc[item?.slug] = item?.default || "";
                  return acc;
                }, {})
              )
        }
      >
        New
      </Button>
    </>
  );

  const selectActions = (selectedRows) => {
    return (
      <Tooltip title="Delete">
        <IconButton
          size="micro"
          onClick={() => setEntriesDeleteModal(selectedRows)}
        >
          <DeleteOutline sx={{ color: "error.light" }} />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <>
      <MuiTable
        page={pagination_page}
        setPage={setPaginationPage}
        action={!hideActions ? action : null}
        columns={columns}
        loading={loading}
        rowHeight={rowHeight}
        views={views}
        sort={sort}
        setSort={setSort}
        columnSizes={columnSizes}
        setColumnSizes={setColumnSizes}
        filters={filters}
        setFilters={setFilters}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
        rows={data?.entries}
        selectActions={selectActions}
        pagination={data?.pagination}
        preferences={preferences}
        saveTransaction={saveTableTransaction}
        onRowClick={
          !!onRowClick
            ? ({ row }) => onRowClick(row)
            : ({ row }) => setContentEditor(row)
        }
      />
      {!!content_editor && (
        <TableRowEditor
          open={content_editor}
          onEntrySubmit={onEntrySubmit}
          onClose={() => setContentEditor(null)}
        />
      )}
      <EntriesDeleteModal
        open={entriesDeleteModal}
        onClose={() => setEntriesDeleteModal(false)}
      />
    </>
  );
};

const TableManager = ({
  table,
  hiddenColumns = [],
  appendColumns = [],
  rowHeight = 42,
  hideActions = false,
  rowFullWidth = undefined,
  onEntrySubmit,
  onNewClick,
  onRowClick,
}) => {
  return (
    <TableProvider id={table}>
      <TableManagerContent
        rowHeight={rowHeight}
        onRowClick={onRowClick}
        onNewClick={onNewClick}
        hideActions={hideActions}
        rowFullWidth={rowFullWidth}
        onEntrySubmit={onEntrySubmit}
        hiddenColumns={hiddenColumns}
        appendColumns={appendColumns}
      />
    </TableProvider>
  );
};

export default TableManager;
