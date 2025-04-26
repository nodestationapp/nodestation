import SettingsForm from "components/SettingsForm";
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
