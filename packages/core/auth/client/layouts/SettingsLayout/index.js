import { Outlet, useLocation } from "react-router-dom";
import { BaseLayout } from "@nstation/design-system/Layouts";

const SettingsLayout = () => {
  const { pathname } = useLocation();

  const tabs = [
    {
      title: "General",
      href: "/settings",
      subtitle: "Manage your general profile settings",
    },
    {
      title: "Security",
      href: "/settings/security",
      subtitle: "Manage your security settings",
    },
    {
      title: "API Tokens",
      href: "/settings/api-tokens",
      subtitle: "Manage your API tokens",
    },
  ];

  const currentTab = tabs.find((tab) => tab.href === pathname);

  return (
    <BaseLayout
      tabs={tabs}
      title={currentTab.title}
      subtitle={currentTab.subtitle}
    >
      <Outlet />
    </BaseLayout>
  );
};

export default SettingsLayout;
