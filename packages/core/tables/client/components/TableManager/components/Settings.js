import { BaseLayout } from "@nstation/design-system/Layouts";
import { SettingsForm } from "@nstation/design-system";
import InputElementsEditor from "../../InputElementsEditor/index.js";

import TableProvider, { useTable } from "../../../contexts/table.js";

const UsersSettingsContent = () => {
  const { data, updateTable } = useTable();

  const table = data?.table;

  const formInitialValues = {
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

  return (
    <BaseLayout title="Settings" subtitle="Manage your authentication settings">
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
