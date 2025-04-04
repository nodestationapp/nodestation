import { useState } from "react";

import TableReader from "components/TableReader";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import ArchiveTableEntryModal from "page_components/tables/components/ArchiveTableEntryModal";
import TableContentEditor from "page_components/tables/CurrentContent/components/TableContentEditor";

import { TrashIcon, UsersIcon } from "@heroicons/react/24/outline";
import MuiTable from "components/MuiTable";
import useSetBreadcrumbs from "hooks/useSetBreadcrumbs";
import { People } from "@mui/icons-material";
import { useTable } from "context/client/table";
import AddIcon from "@mui/icons-material/Add";

import tableColumnsRender from "libs/helpers/tableColumnsRender";
import { Button } from "@mui/material";

const UsersContent = () => {
  const [content_editor, setContentEditor] = useState(null);
  const [archive_entry_modal, setArchiveEntryModal] = useState(false);
  const { data, loading, saveTableTransaction } = useTable();

  const selectAction = [
    {
      icon: <TrashIcon color="#FF3636" />,
      onClick: () => setArchiveEntryModal(true),
    },
  ];

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
    <MuiTable
      rows={data?.entries}
      columns={columns}
      loading={loading}
      views={data?.views}
      action={action}
      preferences={data?.preferences}
      saveTransaction={saveTableTransaction}
    />
    // <DashboardContentLayout breadcrumps={breadcrumps}>
    //   <TableReader
    //     selectAction={selectAction}
    //     newButton={() => setContentEditor(true)}
    //     rowClick={(row) => setContentEditor(row)}
    //   />
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
    // </DashboardContentLayout>
  );
};

export default UsersContent;
