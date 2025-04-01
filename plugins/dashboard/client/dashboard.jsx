import "./styles.scss";

import { Button } from "@nstation/design-system";

import DashboardContentLayout from "components/layouts/DashboardContentLayout";

import { PresentationChartBarIcon } from "@heroicons/react/24/outline";
import { useApp } from "context/app";

const mainClass = "dashboard-content";

const breadcrumps = [
  {
    icon: <PresentationChartBarIcon />,
    label: "Dashboard",
  },
];

const DashboardContent = () => {
  const { user } = useApp();

  return (
    <DashboardContentLayout breadcrumps={breadcrumps}>
      <div className={mainClass}>
        <div className={`${mainClass}__placeholder`}>
          <h1>Welcome {user?.first_name} 👋</h1>
          <span>
            Get familiar with dashboard, here are some ways to get started.
          </span>
          <Button primary={true}>Documentation</Button>
        </div>
      </div>
    </DashboardContentLayout>
  );
};

export default DashboardContent;
