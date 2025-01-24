import { useState } from "react";

import Button from "components/Button";
import IconButton from "components/IconButton";
import NoItemsFound from "components/List/components/NoItemsFound";
import ArchiveTableModal from "../components/ArchiveTableModal";
import TableContentEditor from "./components/TableContentEditor";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { useTable } from "context/client/table";

import {
  CircleStackIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import TableStack from "components/TableStack";

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

  const rowAction = (row) => (
    <>
      {/* <IconButton
        icon={<TrashIcon color="#FF3636" />}
        onClick={(e) => {
          e.stopPropagation();
          setArchiveModal(row);
        }}
      /> */}
    </>
  );

  let formatted_fields = columns?.filter((item) => item?.slug !== "id");

  const new_entry_schema = formatted_fields?.reduce((obj, item) => {
    obj[item.slug] = null;
    return obj;
  }, {});

  return (
    <>
      <DashboardContentLayout
        loading={loading}
        noContentPadding
        breadcrumps={breadcrumps}
        submenu={!!table?.id ? submenu_data : []}
        action={
          <>
            {!!table?.id && (
              <>
                <IconButton
                  onClick={() => setArchiveModal(table)}
                  icon={<TrashIcon color="#FF3636" />}
                />
                <Button
                  onClick={() => setContentEditor(new_entry_schema)}
                  icon={<PlusIcon />}
                >
                  Add Entry
                </Button>
              </>
            )}
          </>
        }
      >
        {entries?.length === 0 ? (
          <NoItemsFound />
        ) : (
          <TableStack
            data={entries}
            columns={columns}
            rowAction={rowAction}
            rowClick={(row) => setContentEditor(row)}
          />
        )}
        {!!content_editor && (
          <TableContentEditor
            data={content_editor}
            onClose={() => setContentEditor(null)}
          />
        )}
      </DashboardContentLayout>
      {/* {!!archive_modal && (
        <ArchiveTableModal
          data={archive_modal}
          onClose={() => setArchiveModal(false)}
        />
      )} */}
    </>
  );
};

export default FormContent;
