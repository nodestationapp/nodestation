import { useNavigate } from "react-router-dom";

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

  const selectAction = [
    {
      icon: <TrashIcon color="#FF3636" />,
      // onClick: (rows, clearSelection) =>
      //   setArchiveUserModal({ rows, clearSelection }),
    },
  ];

  return (
    <DashboardContentLayout noContentPadding breadcrumps={breadcrumps}>
      <TableStack
        data={forms}
        columns={columns}
        fullWidth
        loading={loading}
        // tableName={"nodestation_users"}
        selectAction={selectAction}
        rowClick={(row) => navigate(`/forms/${row?.id}`)}
        // asideMenu={asideMenu}
        addRowButton={{
          label: "New",
          icon: <PlusIcon />,
          onClick: () => navigate(`/forms/new/settings`),
        }}
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
