import Table from "components/Table";
import Button from "components/Button";
import IconButton from "components/IconButton";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";
import ArchiveMiddlewareModal from "../components/ArchiveMiddlewareModal";

import { useApp } from "context/app";
import { useMiddlewares } from "context/client/middlewares";

import {
  PlusIcon,
  ShieldCheckIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const breadcrumps = [
  {
    icon: <ShieldCheckIcon />,
    label: "Middlewares",
  },
];

const MiddlewaresContent = () => {
  const { setContentEditorModal } = useApp();
  const { middlewares, loading, archive_modal, setArchiveModal } =
    useMiddlewares();

  const fields = [
    {
      key: "name",
      value: "Name",
    },
  ];

  const table_data = {
    keys: [...fields],
    items: middlewares?.map((item) => ({
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
      ],
    })),
  };

  return (
    <DashboardContentLayout
      loading={!!loading}
      breadcrumps={breadcrumps}
      action={
        <Button
          onClick={() => setContentEditorModal("mid_new")}
          icon={<PlusIcon />}
        >
          Add middleware
        </Button>
      }
    >
      <Table data={table_data} />
      {!!archive_modal && (
        <ArchiveMiddlewareModal
          data={archive_modal}
          onClose={() => setArchiveModal(null)}
        />
      )}
    </DashboardContentLayout>
  );
};

export default MiddlewaresContent;
