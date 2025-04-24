import BaseLayout from "layouts/BaseLayout";
import SettingsForm from "components/SettingsForm";
import MediaProviders from "./components/MediaProviders.js";

import MediaProvider from "context/client/media";
import useSetBreadcrumbs from "hooks/useSetBreadcrumbs";

import { Photo } from "@mui/icons-material";

const MediaSettingsContent = () => {
  useSetBreadcrumbs([
    {
      icon: Photo,
      label: "Media",
      href: "/media",
    },
    {
      label: "Settings",
    },
  ]);

  const settings_data = [
    {
      label: "Provider",
      component: <MediaProviders />,
    },
  ];

  const tabs = [
    {
      title: "Entries",
      href: "/media",
    },
  ];

  return (
    <BaseLayout
      title="Settings"
      subtitle="Manage your media settings"
      tabs={tabs}
    >
      <SettingsForm data={settings_data} />
    </BaseLayout>
  );
};

const MediaSettings = () => {
  return (
    <MediaProvider>
      <MediaSettingsContent />
    </MediaProvider>
  );
};

export default MediaSettings;
