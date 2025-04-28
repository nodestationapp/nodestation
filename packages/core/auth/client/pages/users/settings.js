import BaseLayout from "layouts/BaseLayout";
import SettingsForm from "components/SettingsForm";
import InputElementsEditor from "components/InputElementsEditor";

import TableProvider, {
  useTable,
} from "../../../../tables/client/contexts/table.js";

const UsersSettingsContent = () => {
  const { data, updateTable } = useTable();

  const table = data?.table;

  const formInitialValues = {
    name: "auth",
    fields: table?.fields || [],
  };

  const settings_data = [
    {
      label: "Fields",
      component: (
        <InputElementsEditor data={formInitialValues} onSubmit={updateTable} />
      ),
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
