import BaseLayout from "layouts/BaseLayout";
import SettingsForm from "components/SettingsForm";
import InputElementsEditor from "components/InputElementsEditor";

import { useTable } from "context/client/table";
import TableProvider from "context/client/table";
import useSetBreadcrumbs from "hooks/useSetBreadcrumbs";

import { People } from "@mui/icons-material";

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
      <SettingsForm data={settings_data} />
    </BaseLayout>
  );
};

const UsersSettings = () => {
  return (
    <TableProvider id="nodestation_users">
      <UsersSettingsContent />
    </TableProvider>
  );
};

export default UsersSettings;
