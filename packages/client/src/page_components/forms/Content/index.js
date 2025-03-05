import { useNavigate } from "react-router-dom";

import TableStack from "components/TableStack";
import ArchiveFormModal from "../components/ArchiveFormModal";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { useForms } from "context/client/forms";
import { useOrganization } from "context/organization";

import { PaperAirplaneIcon, TrashIcon } from "@heroicons/react/24/outline";

const breadcrumps = [
  {
    icon: <PaperAirplaneIcon />,
    label: "Forms",
  },
];

const FormsContent = () => {
  const navigate = useNavigate();
  const { forms, loading, archive_modal, setArchiveModal } = useForms();
  const { setAddTableModal, preferences } = useOrganization();

  const columns = [
    {
      key: "badge_name",
      value: "Name",
      slug: "badge_name",
      type: "badge_name",
    },
  ];

  const toolbar = {
    menu: [
      {
        label: "My forms",
        href: `/forms`,
      },
    ],
    noEditableView: true,
    hideColumnOrder: true,
    newButtonHandler: () => setAddTableModal("form"),
    selectAction: [
      {
        icon: <TrashIcon color="#FF3636" />,
        onClick: () => setArchiveModal(true),
      },
    ],
  };

  return (
    <DashboardContentLayout breadcrumps={breadcrumps}>
      <TableStack
        fullWidth
        toolbar={toolbar}
        data={forms}
        tableId="nodestation_forms"
        columns={columns}
        loading={loading}
        rowClick={(row) => {
          const preference = preferences?.find(
            (item) => item?.table_id === row?.row?.id
          )?.id;

          navigate(`/forms/${row?.row?.id}?v=${preference}`);
        }}
      />
      {!!archive_modal && (
        <ArchiveFormModal type="list" onClose={() => setArchiveModal(null)} />
      )}
    </DashboardContentLayout>
  );
};

export default FormsContent;
