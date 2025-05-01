import BaseLayout from "layouts/BaseLayout";
import SettingsForm from "components/SettingsForm";
import SettingTemplates from "../../../components/SettingTemplates.js";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const UsersTemplates = () => {
  const settings_data = [
    {
      label: "Templates",
      component: <SettingTemplates />,
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
      title="Templates"
      subtitle="Manage your authentication templates"
      tabs={tabs}
    >
      <SettingsForm data={settings_data} />
    </BaseLayout>
  );
};

export default UsersTemplates;
