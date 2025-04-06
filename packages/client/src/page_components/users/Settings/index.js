import TableSettingsEditor from "components/TableSettingsEditor";

import Button from "components/Button";
import BaseLayout from "layouts/BaseLayout";
import SettingsForm from "components/SettingsForm";

import { useTable } from "context/client/table";
import useSetBreadcrumbs from "hooks/useSetBreadcrumbs";

import { People } from "@mui/icons-material";
import InputElementsEditor from "components/InputElementsEditor";

const UsersSettingsContent = () => {
  const { data } = useTable();

  useSetBreadcrumbs([
    {
      icon: People,
      label: "Authentication",
      href: "/authentication",
    },
    {
      label: "Settings",
    },
  ]);

  const table = data?.table;

  const formInitialValues = {
    name: "auth",
    fields: table?.fields || [],
  };

  const settings_data = [
    {
      label: "Fields",
      component: <InputElementsEditor data={formInitialValues} />,
    },
  ];

  const action = () => (
    <Button
      size="small"
      color="primary"
      variant="contained"
      // onClick={() =>
      //   setContentEditor(
      //     data?.table?.fields?.reduce((acc, item) => {
      //       acc[item?.slug] = "";
      //       return acc;
      //     }, {})
      //   )
      // }
    >
      New
    </Button>
  );

  const tabs = [
    {
      title: "Entries",
      href: "/authentication?v=5c75616b-1de4-4fc7-b29d-a320ed1e8cd9",
    },
  ];

  return (
    <BaseLayout
      title="Settings"
      subtitle="Manage your authentication settings"
      tabs={tabs}
    >
      {/* <Toolbar tabs={[]} action={action} /> */}
      <SettingsForm data={settings_data} />
    </BaseLayout>
  );
};

export default UsersSettingsContent;
