import { SettingsRounded } from "@mui/icons-material";

import SettingsForm from "components/SettingsForm";
import ChangePasswordForm from "page_components/settings/SecurityContent/ChangePasswordForm";

import useSetBreadcrumbs from "hooks/useSetBreadcrumbs";

const SecuritySettings = () => {
  useSetBreadcrumbs([
    {
      icon: SettingsRounded,
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Security",
    },
  ]);

  const settings_data = [
    {
      label: "Change password",
      component: <ChangePasswordForm />,
    },
  ];

  return <SettingsForm data={settings_data} />;
};

export default SecuritySettings;
