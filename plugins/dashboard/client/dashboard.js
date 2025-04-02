import "./styles.scss";

import { Button } from "@nstation/design-system";

import BaseLayout from "components/layouts/DashboardContentLayout";

import { useApp } from "context/app";

const mainClass = "dashboard-content";

const breadcrumps = [
  {
    icon: "PresentationChartBarIcon",
    label: "Dashboard",
  },
];

const DashboardContent = () => {
  const { user } = useApp();

  return (
    <BaseLayout breadcrumps={breadcrumps}>
      <div className={mainClass}>
        <div className={`${mainClass}__placeholder`}>
          <h1>Welcome {user?.first_name} 👋</h1>
          <span>
            Get familiar with dashboard, here are some ways to get started.
          </span>
          <Button>Documentation</Button>
        </div>
      </div>
    </BaseLayout>
  );
};

export default DashboardContent;
