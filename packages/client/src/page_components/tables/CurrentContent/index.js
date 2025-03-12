import { useState } from "react";

import TableReader from "components/TableReader";
import TableContentEditor from "./components/TableContentEditor";
import ArchiveTableEntryModal from "./components/ArchiveTableEntryModal";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { useTable } from "context/client/table";

import { TrashIcon } from "@heroicons/react/24/outline";
import { CircleStackIcon } from "@heroicons/react/24/outline";

const TablesContent = () => {
  const { data } = useTable();

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
      icon: <CircleStackIcon />,
      label: "Tables",
    },
    {
      label: data?.table?.name,
    },
  ];

  const new_entry_schema = data?.table?.fields?.reduce((obj, item) => {
    obj[item.slug] = null;
    return obj;
  }, {});

  return (
    <DashboardContentLayout breadcrumps={breadcrumps}>
      <TableReader
        selectAction={selectAction}
        newButton={() => setContentEditor(new_entry_schema)}
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

export default TablesContent;
