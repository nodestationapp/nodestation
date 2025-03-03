import { useState } from "react";

import TableReader from "components/TableReader";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import ArchiveTableEntryModal from "page_components/tables/components/ArchiveTableEntryModal";
import TableContentEditor from "page_components/tables/CurrentContent/components/TableContentEditor";

import { TrashIcon, UsersIcon } from "@heroicons/react/24/outline";

const UsersContent = () => {
  const [archive_entry_modal, setArchiveEntryModal] = useState(false);
  const [content_editor, setContentEditor] = useState(null);

  const selectAction = [
    {
      icon: <TrashIcon color="#FF3636" />,
      onClick: () => setArchiveEntryModal(true),
    },
  ];

  const breadcrumps = [
    {
      label: "Authentication",
      icon: <UsersIcon />,
    },
  ];

  return (
    <DashboardContentLayout breadcrumps={breadcrumps}>
      <TableReader
        selectAction={selectAction}
        newButton={() => setContentEditor(true)}
        rowClick={(row) => setContentEditor(row)}
      />
      {!!archive_entry_modal && (
        <ArchiveTableEntryModal
          data={archive_entry_modal}
          onClose={() => setArchiveEntryModal(false)}
        />
      )}
      {!!content_editor && (
        <TableContentEditor
          data={content_editor}
          onClose={() => setContentEditor(null)}
        />
      )}
    </DashboardContentLayout>
  );
};

export default UsersContent;
