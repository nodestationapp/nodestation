import "./styles.scss";

import SettingsForm from "components/SettingsForm";
import SectionHeader from "components/SectionHeader";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { AtSymbolIcon } from "@heroicons/react/24/outline";

const breadcrumps = [
  {
    icon: <AtSymbolIcon />,
    label: "Emails",
    href: "/emails",
  },
  {
    label: "Settings",
  },
];

const settings_data = [
  {
    label: "Provider",
    items: [
      {
        name: "provider",
        type: "email_providers",
      },
    ],
  },
];

const EmailContentSettings = () => {
  const toolbar = {
    menu: [
      {
        label: "Templates",
        href: "/emails",
      },
    ],
  };

  return (
    <DashboardContentLayout toolbar={toolbar} breadcrumps={breadcrumps}>
      <div className="email-content__settings">
        <SectionHeader title="Settings" subtitle="Manage your email settings" />
        <SettingsForm data={settings_data} />
      </div>
    </DashboardContentLayout>
  );
};

export default EmailContentSettings;
