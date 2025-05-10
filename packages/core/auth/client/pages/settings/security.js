import { SettingsForm } from "@nstation/design-system";
import ChangePasswordForm from "../../components/ChangePasswordForm.js";

const SecuritySettings = () => {
  const settings_data = [
    {
      label: "Change password",
      component: <ChangePasswordForm />,
    },
  ];

  return <SettingsForm data={settings_data} />;
};

export default SecuritySettings;
