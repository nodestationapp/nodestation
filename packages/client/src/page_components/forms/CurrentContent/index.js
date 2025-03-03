import { useState } from "react";

import TableView from "components/TableReader";
import PreviewModal from "./components/PreviewModal";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import ArchiveTableEntryModal from "page_components/tables/components/ArchiveTableEntryModal";

import { TrashIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

import { useTable } from "context/client/table";

const FormContent = () => {
  const { data } = useTable();

  const [preview_modal, setPreviewModal] = useState(null);
  const [archive_entry_modal, setArchiveEntryModal] = useState(false);

  const selectAction = [
    {
      icon: <TrashIcon color="#FF3636" />,
      onClick: () => setArchiveEntryModal(true),
    },
  ];

  const breadcrumps = [
    {
      icon: <PaperAirplaneIcon />,
      label: "Forms",
    },
    {
      label: data?.table?.name,
    },
  ];

  return (
    <DashboardContentLayout breadcrumps={breadcrumps}>
      <TableView
        selectAction={selectAction}
        rowClick={(row) => setPreviewModal(row)}
      />
      {!!archive_entry_modal && (
        <ArchiveTableEntryModal
          data={archive_entry_modal}
          onClose={() => setArchiveEntryModal(false)}
        />
      )}
      {!!preview_modal && (
        <PreviewModal
          data={preview_modal}
          onClose={() => setPreviewModal(null)}
        />
      )}
    </DashboardContentLayout>
  );
};

export default FormContent;
