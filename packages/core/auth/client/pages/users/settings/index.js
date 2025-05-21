import { SettingsForm } from "@nstation/design-system";
import { BaseLayout } from "@nstation/design-system/Layouts";

import InputElementsEditor from "@nstation/tables/client/components/InputElementsEditor/index.js";

import TableProvider, {
  useTable,
} from "@nstation/tables/client/contexts/table.js";

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
      title: "Schema",
      href: "/authentication/settings",
    },
    {
      title: "Templates",
      href: "/authentication/settings/templates",
    },
  ];

  return (
    <BaseLayout
      tabs={tabs}
      title="Schema"
      subtitle="Manage your authentication schema"
      backButtonLink="/authentication"
    >
      <SettingsForm data={settings_data} />
    </BaseLayout>
  );
};

const UsersSettings = () => {
  return (
    <TableProvider id="nodestation_users" extendable={true}>
      <UsersSettingsContent />
    </TableProvider>
  );
};

export default UsersSettings;
