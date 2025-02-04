import { useNavigate } from "react-router-dom";

import Button from "components/Button";
import TableStack from "components/TableStack";
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
  const navigate = useNavigate();
  const { forms, loading, archive_modal, setArchiveModal } = useForms();

  const columns = [
    {
      key: "badge_name",
      value: "Name",
      slug: "badge_name",
      type: "badge_name",
    },
  ];

  // const toolbar = {
  //   action: [
  //     <Button
  //       icon={<PlusIcon />}
  //       onClick={() => navigate(`/forms/new/settings`)}
  //     >
  //       New
  //     </Button>,
  //   ],
  //   selectAction: [
  //     {
  //       icon: <TrashIcon color="#FF3636" />,
  //       onClick: (rows) => setArchiveModal(rows),
  //     },
  //   ],
  // };

  const toolbar = {
    menu: [
      {
        label: "My forms",
        href: `/forms`,
      },
    ],
    hideColumnOrder: true,
    newButtonHandler: () => navigate(`/forms/new/settings`),
  };

  return (
    <DashboardContentLayout breadcrumps={breadcrumps}>
      <TableStack
        fullWidth
        toolbar={toolbar}
        data={forms}
        columns={columns}
        loading={loading}
        rowClick={(row) => navigate(`/forms/${row?.row?.id}`)}
      />
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
