import "./styles.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "components/Button";
import TableStack from "components/TableStack";
import IconButton from "components/IconButton";
import ArchiveCronModal from "./components/ArchiveCronModal";
import EditorContentLayout from "components/layouts/EditorContentLayout";

import { useEditor } from "context/client/editor";

import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

const CronsList = () => {
  const navigate = useNavigate();
  const { editor } = useEditor();

  const crons = editor?.filter((item) => item?.type === "cron");

  const [archive_modal, setArchiveModal] = useState(false);

  const formatted_crons = crons?.map((item) => ({
    ...item,
    ...item?.options,
  }));

  const columns = [
    {
      key: "name",
      value: "Name",
      slug: "name",
      type: "name",
    },
    {
      key: "status",
      value: "Status",
      slug: "status",
      type: "status",
    },
    {
      key: "schedule",
      value: "Schedule",
      slug: "schedule",
    },
    {
      key: "timezone",
      value: "Timezone",
      slug: "timezone",
    },
  ];

  return (
    <>
      <EditorContentLayout
        with_padding
        action={
          <Button href="/editor/new?type=cron" icon={<PlusIcon />}>
            New
          </Button>
        }
      >
        <TableStack
          fullWidth
          toolbar={{
            menu: [{ label: "Crons", variant: "label" }],
            hideColumnOrder: true,
          }}
          data={formatted_crons}
          columns={columns}
          disabledSelect={true}
          rowClick={({ row }) =>
            navigate(`/editor/crons${row?.slug}/${row?.id}`)
          }
          rowAction={({ row }) => (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setArchiveModal(row);
              }}
              icon={<TrashIcon color="#FF3636" />}
            />
          )}
        />
      </EditorContentLayout>
      {!!archive_modal && (
        <ArchiveCronModal
          data={archive_modal}
          onClose={() => setArchiveModal(null)}
        />
      )}
    </>
  );
};

export default CronsList;
