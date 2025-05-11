import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { alpha } from "@mui/material/styles";
import { Button, IconButton, Tooltip } from "@mui/material";

import MuiTable from "../../components/MuiTable/index.js";
import TableRowEditor from "../../components/TableRowEditor/index.js";
import EntriesDeleteModal from "./components/EntriesDeleteModal/index.js";

import TableProvider, { useTable } from "../../contexts/table.js";
import tableColumnsRender from "../../utils/tableColumnsRender.js";

import AddIcon from "@mui/icons-material/Add";
import Settings from "@mui/icons-material/Settings";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

const TableManagerContent = ({
  hiddenColumns,
  appendColumns,
  rowHeight,
  rowFullWidth,
  onEntrySubmit,
  onNewClick,
}) => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const type = queryParams.get("type");

  const [content_editor, setContentEditor] = useState(null);
  const { data, page, loading, saveTableTransaction } = useTable();
  const [entriesDeleteModal, setEntriesDeleteModal] = useState(false);

  let columnsToShow = data?.table?.fields || [];
  columnsToShow = columnsToShow?.filter(
    (item) => !hiddenColumns.includes(item?.slug)
  );
  columnsToShow = [...appendColumns, ...columnsToShow];

  const columns = tableColumnsRender({
    flex: rowFullWidth,
    columns: columnsToShow,
    preferences: data?.preferences,
  });

  const action = () => (
    <>
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
                  acc[item?.slug] = "";
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
        page={page}
        action={action}
        columns={columns}
        loading={loading}
        rowHeight={rowHeight}
        views={data?.views}
        rows={data?.entries}
        selectActions={selectActions}
        pagination={data?.pagination}
        preferences={data?.preferences}
        saveTransaction={saveTableTransaction}
        onRowClick={({ row }) => setContentEditor(row)}
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
  rowFullWidth = undefined,
  onEntrySubmit,
  onNewClick,
}) => {
  return (
    <TableProvider id={table}>
      <TableManagerContent
        onEntrySubmit={onEntrySubmit}
        hiddenColumns={hiddenColumns}
        appendColumns={appendColumns}
        rowHeight={rowHeight}
        rowFullWidth={rowFullWidth}
        onNewClick={onNewClick}
      />
    </TableProvider>
  );
};

export default TableManager;
