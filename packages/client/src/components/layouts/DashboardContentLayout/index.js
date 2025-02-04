import "./styles.scss";

import cx from "classnames";

import Loader from "components/Loader";
import Breadcrumps from "./components/Breadcrumps";
// import Toolbar from "components/TableStack/components/ToolBar";

const mainClass = "dashboard-content-layout";

const DashboardContentLayout = ({
  toolbar,
  loading,
  children,
  breadcrumps,
  noContentPadding,
}) => {
  return (
    <div className={mainClass}>
      <div className={`${mainClass}__header`}>
        <Breadcrumps data={breadcrumps} loading={loading} />
      </div>
      {/* {(!!toolbar?.menu || !!toolbar?.action) && <Toolbar data={toolbar} />} */}
      <div
        className={cx(`${mainClass}__content`, {
          [`${mainClass}__content--no-padding`]: !!noContentPadding,
        })}
      >
        {!!loading ? (
          <div className={`${mainClass}__content__loader`}>
            <Loader />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default DashboardContentLayout;
