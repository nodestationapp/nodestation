import { PageLoader, SettingsForm } from "@nstation/design-system";
import { BaseLayout } from "@nstation/design-system/Layouts";

// import MediaProviders from "./components/MediaProviders.js";
import LoggerProvider, { useLogger } from "../contexts/logger.js";
import NotificationSettings from "../components/NotificationSettings.js";

const LoggerSettingsContent = () => {
  const { loading } = useLogger();

  const settings_data = [
    {
      label: "Notifications",
      component: <NotificationSettings />,
    },
  ];

  const tabs = [
    {
      title: "Logs",
      href: "/logs",
    },
  ];

  return (
    <BaseLayout
      title="Settings"
      subtitle="Manage your logs settings"
      tabs={tabs}
      loading={loading}
    >
      <SettingsForm data={settings_data} />
    </BaseLayout>
  );
};

const LoggerSettings = () => {
  return (
    <LoggerProvider>
      <LoggerSettingsContent />
    </LoggerProvider>
  );
};

export default LoggerSettings;
