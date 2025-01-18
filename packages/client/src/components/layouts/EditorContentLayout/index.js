import "./styles.scss";

import cx from "classnames";

import Loader from "components/Loader";
import Submenu from "./components/Submenu";
import MinimizeMenu from "./components/MinimizeMenu";

const mainClass = "editor-content-layout";

const EditorContentLayout = ({
  action,
  header_submenu,
  submenu,
  children,
  loading,
  with_padding,
}) => {
  return (
    <div className={mainClass}>
      <div className={`${mainClass}__header`}>
        {!!header_submenu ? (
          <Submenu data={header_submenu} no_padding />
        ) : (
          <MinimizeMenu />
        )}
        <div className={`${mainClass}__header__actions`}>{action}</div>
      </div>
      {!!submenu && <Submenu data={submenu} />}
      <div
        className={cx(`${mainClass}__content`, {
          [`${mainClass}__content--with-padding`]: !!with_padding,
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
      {/* <MinimizeMenu /> */}
    </div>
  );
};

export default EditorContentLayout;
