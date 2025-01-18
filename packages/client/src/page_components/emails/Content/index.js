import { useState } from "react";

import Table from "components/Table";
import Alert from "components/Alert";
import Button from "components/Button";
import IconButton from "components/IconButton";
import ArchiveEmailModal from "../components/ArchiveEmailModal";
import EmailContentEditor from "./components/EmailContentEditor";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { useEmails } from "context/client/emails";

import {
  PlusIcon,
  AtSymbolIcon,
  TrashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

const breadcrumps = [
  {
    icon: <AtSymbolIcon />,
    label: "Emails",
  },
];

const EmailsContent = () => {
  const { emails, email_settings, loading, archive_modal, setArchiveModal } =
    useEmails();

  const [email_editor, setEmailEditor] = useState(null);

  const submenu_data = [
    {
      label: "Templates",
      href: "/emails",
    },
    {
      label: "Settings",
      href: "/emails/settings",
      icon: !!!email_settings?.active ? (
        <ExclamationCircleIcon color="#FFD00D" />
      ) : null,
    },
  ];

  const fields = [
    {
      key: "name",
      value: "Name",
    },
  ];

  const table_data = {
    keys: [...fields],
    items: emails?.map((item) => {
      return {
        data: [
          {
            key: "name",
            value: (
              <>
                {item?.name}
                {!!item?.locked && (
                  <LockClosedIcon color="#647082" height={18} width={18} />
                )}
              </>
            ),
          },
        ],
        onclick: () => setEmailEditor(item?.id),
        actions: !!!item?.locked ? (
          <>
            <IconButton
              icon={<TrashIcon color="#FF3636" />}
              onClick={(e) => {
                e.stopPropagation();
                setArchiveModal(item);
              }}
            />
          </>
        ) : null,
      };
    }),
  };

  return (
    <DashboardContentLayout
      breadcrumps={breadcrumps}
      action={
        <Button onClick={() => setEmailEditor("new")} icon={<PlusIcon />}>
          Add template
        </Button>
      }
      submenu={submenu_data}
    >
      {!!!email_settings?.active && (
        <Alert
          text="To send email messages, you must first configure your settings."
          action={
            <Button variant="transparent" href="/emails/settings">
              Configure
            </Button>
          }
        />
      )}
      <Table data={table_data} loading={loading} />
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
