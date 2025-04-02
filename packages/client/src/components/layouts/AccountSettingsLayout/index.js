import "./styles.scss";
import { Outlet, useLocation } from "react-router-dom";

import DashboardContentLayout from "../DashboardContentLayout";

const mainClass = "account-settings-layout";

const submenu_data = [
  {
    label: "General",
    href: `/settings`,
  },
  {
    label: "Security",
    href: `/settings/security`,
  },
];

const toolbar = {
  menu: [
    {
      label: "General",
      href: `/settings`,
    },
    {
      label: "Security",
      href: `/settings/security`,
    },
  ],
};

const AccountSettingsLayout = () => {
  const { pathname } = useLocation();
  const current_view = pathname?.split("/")?.[2];

  const breadcrumps = [
    {
      icon: "Cog6ToothIcon",
      label: "Settings",
    },
    ...(!!current_view
      ? [
          {
            label: current_view[0].toUpperCase() + current_view.slice(1),
          },
        ]
      : []),
  ];

  return (
    <div className={mainClass}>
      <DashboardContentLayout
        toolbar={toolbar}
        breadcrumps={breadcrumps}
        submenu={submenu_data}
      >
        <Outlet />
      </DashboardContentLayout>
    </div>
  );
};

export default AccountSettingsLayout;
