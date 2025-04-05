import { useState } from "react";
import { Button } from "@mui/material";

import MuiTable from "components/MuiTable";
import TableRowEditor from "components/TableRowEditor";

import { useTable } from "context/client/table";
import useSetBreadcrumbs from "hooks/useSetBreadcrumbs";
import tableColumnsRender from "libs/helpers/tableColumnsRender";

import { People } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

//todo: add archive modal

const UsersContent = () => {
  const [content_editor, setContentEditor] = useState(null);
  const { data, loading, saveTableTransaction } = useTable();

  useSetBreadcrumbs([
    {
      icon: People,
      label: "Authentication",
    },
  ]);

  const columns = tableColumnsRender({
    columns: data?.columns,
    preferences: data?.preferences,
  });

  const action = () => (
    <Button
      variant="contained"
      color="primary"
      size="small"
      startIcon={<AddIcon />}
    >
      New
    </Button>
  );

  return (
    <>
      <MuiTable
        action={action}
        columns={columns}
        loading={loading}
        views={data?.views}
        rows={data?.entries}
        preferences={data?.preferences}
        saveTransaction={saveTableTransaction}
        onRowClick={(row) => setContentEditor(row)}
      />
      {!!content_editor && (
        <TableRowEditor
          open={content_editor}
          onClose={() => setContentEditor(null)}
        />
      )}
    </>
    //   {!!archive_entry_modal && (
    //     <ArchiveTableEntryModal
    //       data={archive_entry_modal}
    //       onClose={() => setArchiveEntryModal(false)}
    //     />
    //   )}
    //   {!!content_editor && (
    //     <TableContentEditor
    //       data={content_editor}
    //       onClose={() => setContentEditor(null)}
    //     />
    //   )}
  );
};

export default UsersContent;
