import { BaseLayout } from "@nstation/design-system/Layouts";
import { SettingsForm } from "@nstation/design-system";
import SettingTemplates from "../../../components/SettingTemplates.js";

const UsersTemplates = () => {
  const settings_data = [
    {
      label: "Templates",
      component: <SettingTemplates />,
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
      title="Templates"
      subtitle="Manage your authentication templates"
      tabs={tabs}
      backButtonLink="/authentication"
    >
      <SettingsForm data={settings_data} />
    </BaseLayout>
  );
};

export default UsersTemplates;
