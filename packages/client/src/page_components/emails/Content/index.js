import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@nstation/design-system";

import TableStack from "components/TableStack";
import ArchiveEmailModal from "../components/ArchiveEmailModal";
import EmailContentEditor from "./components/EmailContentEditor";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { useEmails } from "context/client/emails";

import { AtSymbolIcon, TrashIcon } from "@heroicons/react/24/outline";

const breadcrumps = [
  {
    icon: <AtSymbolIcon />,
    label: "Emails",
  },
];

const EmailsContent = () => {
  const navigate = useNavigate();
  const { emails, loading, archive_modal, setArchiveModal } = useEmails();

  const [email_editor, setEmailEditor] = useState(null);

  const columns = [
    {
      key: "name",
      value: "Name",
      slug: "name",
    },
  ];

  const toolbar = {
    menu: [
      {
        label: "Templates",
        href: `/emails`,
      },
    ],
    hideColumnOrder: true,
    newButtonHandler: () => setEmailEditor("new"),
    settingsButtonHandler: `/emails/settings`,
    selectAction: [
      {
        icon: <TrashIcon color="#FF3636" />,
        onClick: () => setArchiveModal(true),
      },
    ],
  };

  const meta = emails?.map((item) => ({
    locked: item?.locked,
  }));

  return (
    <DashboardContentLayout breadcrumps={breadcrumps}>
      <TableStack
        fullWidth
        hideHeader
        meta={meta}
        data={emails}
        toolbar={toolbar}
        columns={columns}
        loading={loading}
        alert={
          <Alert
            text="To send email messages, you must first configure your settings."
            action={{
              label: "Configure",
              onClick: () => navigate("/emails/settings"),
            }}
          />
        }
        rowClick={(row) => setEmailEditor(row?.row?.id)}
      />
      {!!archive_modal && (
        <ArchiveEmailModal
          data={archive_modal}
          onClose={() => setArchiveModal(null)}
        />
      )}
      {!!email_editor && (
        <EmailContentEditor
          id={email_editor}
          setId={setEmailEditor}
          onClose={() => setEmailEditor(null)}
        />
      )}
    </DashboardContentLayout>
  );
};

export default EmailsContent;
