import "./styles.scss";

import BaseLayout from "components/layouts/DashboardContentLayout";

const mainClass = "dashboard-content";

const breadcrumps = [
  {
    icon: "PhotoIcon",
    label: "Media",
  },
];

const MediaContent = () => {
  return (
    <BaseLayout breadcrumps={breadcrumps}>
      <div className={mainClass}>
        <div className={`${mainClass}__placeholder`}>
          <h1>Media page :)</h1>
        </div>
      </div>
    </BaseLayout>
  );
};

export default MediaContent;
