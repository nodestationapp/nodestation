import TableSettingsEditor from "components/TableSettingsEditor";

import { useTable } from "context/client/table";
import { UsersIcon } from "@heroicons/react/24/outline";
import Button from "components/Button";
import KeyViewer from "components/KeyViewer";

const UsersSettingsContent = () => {
  const { data } = useTable();

  const table = data?.table;

  const toolbar = ({ dirty, isSubmitting, submitForm }) => ({
    menu: [
      {
        label: "Entries",
        href: "/authentication",
      },
    ],
    action: [
      <Button disabled={!!!dirty} loading={!!isSubmitting} onClick={submitForm}>
        Save <KeyViewer data={["⌘", "S"]} />
      </Button>,
    ],
  });

  const breadcrumps = [
    {
      icon: <UsersIcon />,
      label: "Authentication",
      href: "/authentication",
    },
    {
      label: "Settings",
    },
  ];

  const settings_data = [
    {
      label: "Fields",
      items: [
        {
          name: "fields",
          type: "input_editor",
        },
      ],
    },
  ];

  const formInitialValues = {
    name: "auth",
    fields: table?.fields || [],
  };

  return (
    <TableSettingsEditor
      toolbar={toolbar}
      settings={settings_data}
      form={formInitialValues}
      breadcrumps={breadcrumps}
    />
  );
};

export default UsersSettingsContent;
