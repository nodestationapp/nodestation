import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";

import MuiTable from "components/MuiTable";
import TableRowEditor from "components/TableRowEditor";

import { useTable } from "context/client/table";
import useSetBreadcrumbs from "hooks/useSetBreadcrumbs";
import tableColumnsRender from "libs/helpers/tableColumnsRender";

import AddIcon from "@mui/icons-material/Add";
import { People, Settings } from "@mui/icons-material";

//todo: add archive modal

const UsersContent = () => {
  const navigate = useNavigate();
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
    <>
      <IconButton
        size="micro"
        color="secondary"
        onClick={() => navigate(`/authentication/settings`)}
      >
        <Settings />
      </IconButton>
      <Button
        size="small"
        color="primary"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() =>
          setContentEditor(
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
        onRowClick={({ row }) => setContentEditor(row)}
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
  );
};

export default UsersContent;
