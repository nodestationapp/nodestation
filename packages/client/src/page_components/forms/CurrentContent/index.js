import { useState } from "react";

import TableView from "components/TableReader";
import PreviewModal from "./components/PreviewModal";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import ArchiveTableEntryModal from "page_components/tables/components/ArchiveTableEntryModal";

import { TrashIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

import { useTable } from "context/client/table";

const FormContent = () => {
  const { data, updateTableEntry } = useTable();

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

  const meta = data?.entries?.map((item) => ({
    disabled: item?.is_read,
  }));

  return (
    <DashboardContentLayout breadcrumps={breadcrumps}>
      <TableView
        meta={meta}
        selectAction={selectAction}
        rowClick={(row) =>
          setPreviewModal({ data: row, fields: data?.table?.fields })
        }
      />
      {!!archive_entry_modal && (
        <ArchiveTableEntryModal
          data={archive_entry_modal}
          onClose={() => setArchiveEntryModal(false)}
        />
      )}
      {!!preview_modal && (
        <PreviewModal
          {...preview_modal}
          updateTableEntry={updateTableEntry}
          onClose={() => setPreviewModal(null)}
        />
      )}
    </DashboardContentLayout>
  );
};

export default FormContent;
