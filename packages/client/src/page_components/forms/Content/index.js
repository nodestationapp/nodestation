import Table from "components/Table";
import Button from "components/Button";
import IconButton from "components/IconButton";
import ArchiveFormModal from "../components/ArchiveFormModal";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { useForms } from "context/client/forms";

import {
  PlusIcon,
  PaperAirplaneIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const breadcrumps = [
  {
    icon: <PaperAirplaneIcon />,
    label: "Forms",
  },
];

const FormsContent = () => {
  const { forms, loading, archive_modal, setArchiveModal } = useForms();

  const fields = [
    {
      key: "name",
      value: "Name",
    },
  ];

  const table_data = {
    keys: [...fields],
    items: forms?.map((item) => ({
      href: `/forms/${item?.id}`,
      disabled: item?.status === "inactive",
      actions: (
        <>
          <IconButton
            icon={<TrashIcon color="#FF3636" />}
            onClick={(e) => {
              e.preventDefault();
              setArchiveModal(item);
            }}
          />
        </>
      ),
      data: [
        {
          key: "name",
          type: "badge_name",
          value: { name: item?.name, count: item?.unread_count },
        },
      ],
    })),
  };

  return (
    <DashboardContentLayout
      breadcrumps={breadcrumps}
      action={
        <Button href="/forms/new/settings" icon={<PlusIcon />}>
          Add form
        </Button>
      }
    >
      <Table data={table_data} loading={loading} />
      {!!archive_modal && (
        <ArchiveFormModal
          type="list"
          data={archive_modal}
          onClose={() => setArchiveModal(null)}
        />
      )}
    </DashboardContentLayout>
  );
};

export default FormsContent;
