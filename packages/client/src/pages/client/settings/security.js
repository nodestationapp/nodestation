import SettingsForm from "components/SettingsForm";
import ChangePasswordForm from "page_components/settings/SecurityContent/ChangePasswordForm";

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
