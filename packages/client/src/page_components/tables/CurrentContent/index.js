import { useState } from "react";

import TableStack from "components/TableStack";
import TableContentEditor from "./components/TableContentEditor";
import ArchiveTableEntryModal from "../components/ArchiveTableEntryModal";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { useTable } from "context/client/table";

import { CircleStackIcon, TrashIcon } from "@heroicons/react/24/outline";

const FormContent = () => {
  const { data, id, loading, sort, setSort, filters, setFilters } = useTable();

  const [content_editor, setContentEditor] = useState(null);
  const [archive_entry_modal, setArchiveEntryModal] = useState(false);

  const table = data?.table;
  const entries = data?.entries || [];

  const breadcrumps = [
    {
      icon: <CircleStackIcon />,
      label: "Tables",
    },
    {
      label: table?.name,
    },
  ];

  const columns =
    table?.fields?.map((item) => ({
      key: item?.type,
      value: item?.name,
      type: item?.type,
      slug: item?.slug,
    })) || [];

  let formatted_fields = columns?.filter((item) => item?.slug !== "id");

  const new_entry_schema = formatted_fields?.reduce((obj, item) => {
    obj[item.slug] = null;
    return obj;
  }, {});

  const toolbar = {
    menu: [
      {
        label: "Entries",
        href: `/tables/${id}`,
      },
    ],
    selectAction: [
      {
        icon: <TrashIcon color="#FF3636" />,
        onClick: () => setArchiveEntryModal(true),
      },
    ],
    settingsButtonHandler: `/tables/${id}/settings`,
    newButtonHandler: () => setContentEditor(new_entry_schema),
  };

  return (
    <>
      <DashboardContentLayout breadcrumps={breadcrumps}>
        <TableStack
          key={[id, sort]}
          sort={sort}
          tableId={id}
          setSort={setSort}
          filters={filters}
          setFilters={setFilters}
          data={entries}
          toolbar={toolbar}
          loading={loading}
          columns={columns}
          tableSchema={table?.fields}
          rowClick={(row) => setContentEditor(row)}
        />
        {!!content_editor && (
          <TableContentEditor
            data={content_editor?.row || content_editor}
            onClose={() => setContentEditor(null)}
          />
        )}
      </DashboardContentLayout>
      {!!archive_entry_modal && (
        <ArchiveTableEntryModal
          data={archive_entry_modal}
          onClose={() => setArchiveEntryModal(false)}
        />
      )}
    </>
  );
};

export default FormContent;
