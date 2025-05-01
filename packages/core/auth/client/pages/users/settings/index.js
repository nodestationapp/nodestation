import BaseLayout from "layouts/BaseLayout";
import SettingsForm from "components/SettingsForm";
import InputElementsEditor from "components/InputElementsEditor";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import TableProvider, {
  useTable,
} from "../../../../../tables/client/contexts/table.js";

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
      title: <ArrowBackIcon fontSize="1rem" />,
      href: "/authentication",
    },
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
      title="Schema"
      subtitle="Manage your authentication schema"
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
