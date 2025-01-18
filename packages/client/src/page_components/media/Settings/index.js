import "./styles.scss";

import SettingsForm from "components/SettingsForm";
import SectionHeader from "components/SectionHeader";
import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { PhotoIcon } from "@heroicons/react/24/outline";

const breadcrumps = [
  {
    icon: <PhotoIcon />,
    label: "Media",
    href: "/media",
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
        type: "media_providers",
      },
    ],
  },
];

const MediaContentSettings = () => {
  const submenu_data = [
    {
      label: "My uploads",
      href: "/media",
    },
    {
      label: "Settings",
      href: "/media/settings",
    },
  ];

  return (
    <DashboardContentLayout breadcrumps={breadcrumps} submenu={submenu_data}>
      <div className="email-content__settings">
        <SectionHeader title="Settings" subtitle="Manage your media settings" />
        <SettingsForm data={settings_data} />
      </div>
    </DashboardContentLayout>
  );
};

export default MediaContentSettings;
