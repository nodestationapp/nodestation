import { useState } from "react";

import Button from "components/Button";
import IconButton from "components/IconButton";
import TableStack from "components/TableStack";
import IconButtonMenu from "components/IconButtonMenu";
import ArchiveTableModal from "../components/ArchiveTableModal";
import TableContentEditor from "./components/TableContentEditor";
import ArchiveTableEntryModal from "../components/ArchiveTableEntryModal";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { useTable } from "context/client/table";

import {
  PlusIcon,
  TrashIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

const FormContent = () => {
  const { data, id, loading } = useTable();

  const [archive_modal, setArchiveModal] = useState(false);
  const [content_editor, setContentEditor] = useState(null);
  const [archive_entry_modal, setArchiveEntryModal] = useState(false);

  const table = data?.table;
  const entries = data?.entries;

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

  const asideMenu = [
    {
      type: "select",
      icon: <TrashIcon />,
      label: "Delete",
      onClick: () => setArchiveModal(table),
    },
  ];

  const toolbar = {
    menu: [
      {
        label: "Entries",
        href: `/tables/${id}`,
      },
    ],
    action: [
      <IconButton
        size="small"
        icon={<Cog6ToothIcon />}
        href={`/tables/${id}/settings`}
      />,
      <IconButtonMenu icon={<EllipsisHorizontalIcon />} data={asideMenu} />,
      <Button
        icon={<PlusIcon />}
        onClick={() => setContentEditor(new_entry_schema)}
      >
        New
      </Button>,
    ],
    selectAction: [
      {
        icon: <TrashIcon color="#FF3636" />,
        onClick: (rows) => setArchiveEntryModal(rows),
      },
    ],
  };

  return (
    <>
      <DashboardContentLayout toolbar={toolbar} breadcrumps={breadcrumps}>
        <TableStack
          key={id}
          data={entries}
          loading={loading}
          columns={columns}
          tableName={table?.slug}
          rowClick={(row) => setContentEditor(row)}
        />
        {!!content_editor && (
          <TableContentEditor
            data={content_editor}
            onClose={() => setContentEditor(null)}
          />
        )}
      </DashboardContentLayout>
      {!!archive_modal && (
        <ArchiveTableModal
          data={archive_modal}
          onClose={() => setArchiveModal(false)}
        />
      )}
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
