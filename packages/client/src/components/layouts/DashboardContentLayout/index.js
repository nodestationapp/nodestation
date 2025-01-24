import "./styles.scss";

import cx from "classnames";
import Loader from "components/Loader";
import Submenu from "./components/Submenu";
import Breadcrumps from "./components/Breadcrumps";

const mainClass = "dashboard-content-layout";

const DashboardContentLayout = ({
  breadcrumps,
  action,
  submenu,
  children,
  loading,
  noContentPadding,
}) => {
  return (
    <div className={mainClass}>
      <div className={`${mainClass}__header`}>
        <Breadcrumps data={breadcrumps} loading={loading} />
        <div className={`${mainClass}__header__actions`}>{action}</div>
      </div>
      {!!submenu && <Submenu data={submenu} />}
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
