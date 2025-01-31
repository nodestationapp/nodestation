import { useState } from "react";

import Alert from "components/Alert";
import Button from "components/Button";
import TableStack from "components/TableStack";
import IconButton from "components/IconButton";
import ArchiveEmailModal from "../components/ArchiveEmailModal";
import EmailContentEditor from "./components/EmailContentEditor";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { useEmails } from "context/client/emails";

import {
  PlusIcon,
  AtSymbolIcon,
  // TrashIcon,
  // LockClosedIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

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

  // const table_data = {
  //   keys: [...fields],
  //   items: emails?.map((item) => {
  //     return {
  //       data: [
  //         {
  //           key: "name",
  //           value: (
  //             <>
  //               {item?.name}
  //               {!!item?.locked && (
  //                 <LockClosedIcon color="#647082" height={18} width={18} />
  //               )}
  //             </>
  //           ),
  //         },
  //       ],
  //       onclick: () => setEmailEditor(item?.id),
  //       actions: !!!item?.locked ? (
  //         <>
  //           <IconButton
  //             icon={<TrashIcon color="#FF3636" />}
  //             onClick={(e) => {
  //               e.stopPropagation();
  //               setArchiveModal(item);
  //             }}
  //           />
  //         </>
  //       ) : null,
  //     };
  //   }),
  // };

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
        href: "/emails",
      },
    ],
    action: [
      <IconButton
        size="small"
        icon={<Cog6ToothIcon />}
        href={`/emails/settings`}
      />,
      <Button onClick={() => setEmailEditor("new")} icon={<PlusIcon />}>
        New
      </Button>,
    ],
  };

  return (
    <DashboardContentLayout toolbar={toolbar} breadcrumps={breadcrumps}>
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
      <TableStack
        fullWidth
        data={emails}
        columns={columns}
        loading={loading}
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
