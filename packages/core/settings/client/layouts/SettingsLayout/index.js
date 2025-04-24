import { Outlet, useLocation } from "react-router-dom";
import BaseLayout from "layouts/BaseLayout";

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
