import { useState } from "react";

import TableReader from "components/TableReader";
import PreviewModal from "./components/PreviewModal";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import ArchiveTableEntryModal from "page_components/tables/components/ArchiveTableEntryModal";

import {
  TrashIcon,
  EnvelopeIcon,
  // ArchiveBoxIcon,
  EnvelopeOpenIcon,
  PaperAirplaneIcon,
  // ArchiveBoxArrowDownIcon,
} from "@heroicons/react/24/outline";

import { useTable } from "context/client/table";
import { useTableWrapper } from "context/client/table-wrapper";

const checkIsReadValue = (entries, selected) => {
  let rows = [];
  Object.keys(selected)?.forEach((item) => {
    rows.push(entries[item]);
  });

  let currentIsRead = null;
  const firstValue = rows[0]?.is_read;
  const allSame = rows?.every((item) => item?.is_read === firstValue);

  if (!!allSame) {
    currentIsRead = !!firstValue;
  }

  return currentIsRead;
};

const FormContent = () => {
  const { data, updateTableEntry } = useTable();
  const { table, selectedRows } = useTableWrapper();

  const [preview_modal, setPreviewModal] = useState(null);
  const [archive_entry_modal, setArchiveEntryModal] = useState(false);

  const isReadSelected = checkIsReadValue(data?.entries, selectedRows);

  const selectAction = [
    {
      icon: !!isReadSelected ? (
        <EnvelopeIcon color="#F0F1F3" />
      ) : isReadSelected === null ? null : (
        <EnvelopeOpenIcon color="#F0F1F3" />
      ),
      onClick: () => onReadHandler(),
    },
    // {
    //   icon: !!true ? (
    //     <ArchiveBoxIcon color="#F0F1F3" />
    //   ) : (
    //     <ArchiveBoxArrowDownIcon color="#F0F1F3" />
    //   ),
    //   // onClick: () => onArchiveHandler(),
    // },
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

  const onReadHandler = async () => {
    try {
      const itemsToRead = table.getSelectedRowModel()?.rows;

      for await (const row of itemsToRead) {
        updateTableEntry(row?.original?.id, {
          is_read: !!isReadSelected ? 0 : 1,
        });
      }

      table.setRowSelection({});
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardContentLayout breadcrumps={breadcrumps}>
      <TableReader
        meta={meta}
        selectAction={selectAction}
        rowClick={(row) =>
          setPreviewModal({ data: row, fields: data?.table?.fields })
        }
      />
      {!!archive_entry_modal && (
        <ArchiveTableEntryModal onClose={() => setArchiveEntryModal(false)} />
      )}
      {!!preview_modal && (
        <PreviewModal
          {...preview_modal}
          displayName={data?.table?.display_name}
          updateTableEntry={updateTableEntry}
          onClose={() => setPreviewModal(null)}
        />
      )}
    </DashboardContentLayout>
  );
};

export default FormContent;
