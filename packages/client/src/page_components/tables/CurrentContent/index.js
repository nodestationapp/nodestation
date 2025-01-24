import { useState } from "react";

import TableStack from "components/TableStack";
import ArchiveTableModal from "../components/ArchiveTableModal";
import TableContentEditor from "./components/TableContentEditor";
import NoItemsFound from "components/List/components/NoItemsFound";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { useTable } from "context/client/table";

import {
  PlusIcon,
  TrashIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";

const FormContent = () => {
  const { data, id, loading } = useTable();

  const [archive_modal, setArchiveModal] = useState(false);
  const [content_editor, setContentEditor] = useState(null);

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

  const submenu_data = [
    {
      label: "Entries",
      href: `/tables/${id}`,
    },
    {
      label: "Settings",
      href: `/tables/${id}/settings`,
    },
  ];

  const columns =
    table?.fields?.map((item) => ({
      key: item?.type,
      value: item?.name,
      type: item?.type,
      slug: item?.slug,
    })) || [];

  const rowActions = (row) => {
    return [
      {
        icon: <TrashIcon color="#FF3636" />,
        onClick: (e) => {
          e.stopPropagation();
          setArchiveModal(row);
        },
      },
    ];
  };

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

  return (
    <>
      <DashboardContentLayout
        loading={loading}
        noContentPadding
        breadcrumps={breadcrumps}
        submenu={!!table?.id ? submenu_data : []}
      >
        {entries?.length === 0 ? (
          <NoItemsFound />
        ) : (
          <TableStack
            data={entries}
            columns={columns}
            onSearch={() => {}}
            rowActions={rowActions}
            rowClick={(row) => setContentEditor(row)}
            asideMenu={asideMenu}
            addRowButton={{
              label: "New",
              icon: <PlusIcon />,
              onClick: () => setContentEditor(new_entry_schema),
            }}
          />
        )}
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
    </>
  );
};

export default FormContent;
