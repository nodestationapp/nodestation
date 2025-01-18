import Table from "components/Table";
import Button from "components/Button";
import IconButton from "components/IconButton";
import ArchiveHelperModal from "../components/ArchiveHelperModal";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { useApp } from "context/app";
import { useHelpers } from "context/client/helpers";

import {
  PlusIcon,
  CodeBracketIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const breadcrumps = [
  {
    icon: <CodeBracketIcon />,
    label: "Functions",
  },
];

const HelpersContent = () => {
  const { setContentEditorModal } = useApp();
  const { helpers, loading, archive_modal, setArchiveModal } = useHelpers();

  const fields = [
    {
      key: "name",
      value: "Name",
    },
  ];

  const table_data = {
    keys: [...fields],
    items: helpers?.map((item) => ({
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
      loading={loading}
      breadcrumps={breadcrumps}
      action={
        <Button
          onClick={() => setContentEditorModal("fn_new")}
          icon={<PlusIcon />}
        >
          Add function
        </Button>
      }
    >
      <Table data={table_data} />
      {!!archive_modal && (
        <ArchiveHelperModal
          data={archive_modal}
          onClose={() => setArchiveModal(null)}
        />
      )}
    </DashboardContentLayout>
  );
};

export default HelpersContent;
