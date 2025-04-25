import { SettingsRounded } from "@mui/icons-material";

import SettingsForm from "components/SettingsForm";
import ChangePasswordForm from "../../components/ChangePasswordForm.js";

import useSetBreadcrumbs from "@nstation/utils/ui/hooks/useSetBreadcrumbs.js";

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
