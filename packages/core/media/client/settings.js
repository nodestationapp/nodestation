import { BaseLayout } from "@nstation/design-system/Layouts";
import { SettingsForm } from "@nstation/design-system";
import MediaProviders from "./components/MediaProviders.js";

import MediaProvider from "./contexts/media.js";

const MediaSettingsContent = () => {
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
