import { SettingsForm } from "@nstation/design-system";
import ChangePasswordForm from "../../components/ChangePasswordForm.js";

import { useSlot } from "contexts/slots.js";

const SecuritySettings = () => {
  const securitySlot = useSlot("auth.settings.security");

  const settings_data = [
    {
      label: "Change password",
      component: <ChangePasswordForm />,
    },
    ...(securitySlot?.[0] || []),
  ];

  return <SettingsForm data={settings_data} />;
};

export default SecuritySettings;
