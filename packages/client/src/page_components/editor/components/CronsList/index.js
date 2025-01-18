import "./styles.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Table from "components/Table";
import Button from "components/Button";
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

  const fields = [
    {
      key: "name",
      value: "Name",
    },
    {
      key: "status",
      value: "Status",
    },
    {
      key: "schedule",
      value: "Schedule",
    },
    {
      key: "timezone",
      value: "Timezone",
    },
  ];

  const table_data = {
    keys: [...fields],
    items: crons?.map((item) => ({
      disabled: item?.status === "inactive",
      onclick: () => navigate(`/editor/crons/${item?.id}`),
      actions: (
        <>
          <IconButton
            icon={<TrashIcon color="#FF3636" />}
            onClick={(e) => {
              e.stopPropagation();
              setArchiveModal(item);
            }}
          />
        </>
      ),
      data: [
        {
          key: "name",
          value: item?.name,
        },
        {
          key: "status",
          type: "status",
          value: item?.status,
        },
        {
          key: "schedule",
          value: item?.schedule,
        },
        {
          key: "timezone",
          value: item?.timezone,
        },
      ],
    })),
  };

  return (
    <>
      <EditorContentLayout
        with_padding
        action={
          <Button href="/editor/new?type=cron" icon={<PlusIcon />}>
            Add cron
          </Button>
        }
      >
        <Table data={table_data} />
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
