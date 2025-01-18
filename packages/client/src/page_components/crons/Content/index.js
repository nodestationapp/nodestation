import Table from "components/Table";
import Button from "components/Button";
import IconButton from "components/IconButton";
import ArchiveCronModal from "../components/ArchiveCronModal";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { useApp } from "context/app";
import { useCrons } from "context/client/crons";

import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusIcon, ClockIcon } from "@heroicons/react/24/outline";

const breadcrumps = [
  {
    icon: <ClockIcon />,
    label: "Crons",
  },
];

const CronsContent = () => {
  const { setContentEditorModal } = useApp();
  const { crons, loading, archive_modal, setArchiveModal } = useCrons();

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
      onclick: () => setContentEditorModal(item?.id),
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
          value: item?.label,
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
    <DashboardContentLayout
      loading={loading}
      breadcrumps={breadcrumps}
      action={
        <Button
          onClick={() => setContentEditorModal("cron_new")}
          icon={<PlusIcon />}
        >
          Add cron
        </Button>
      }
    >
      <Table data={table_data} />
      {!!archive_modal && (
        <ArchiveCronModal
          data={archive_modal}
          onClose={() => setArchiveModal(null)}
        />
      )}
    </DashboardContentLayout>
  );
};

export default CronsContent;
