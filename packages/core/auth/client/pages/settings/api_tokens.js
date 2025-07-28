import { SettingsForm } from "@nstation/design-system";
import ApiKeysProvider from "../../contexts/api-keys.js";
import ApiTokensTable from "../../components/ApiTokensTable.js";

const ApiTokensSettings = () => {
  const settings_data = [
    {
      component: <ApiTokensTable />,
    },
  ];

  return (
    <ApiKeysProvider>
      <SettingsForm data={settings_data} />
    </ApiKeysProvider>
  );
};

export default ApiTokensSettings;
