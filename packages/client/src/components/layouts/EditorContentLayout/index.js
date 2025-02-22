import "./styles.scss";

import cx from "classnames";

import Loader from "components/Loader";
import MinimizeMenu from "./components/MinimizeMenu";

const mainClass = "editor-content-layout";

const EditorContentLayout = ({ action, children, loading, with_padding }) => {
  return (
    <div className={mainClass}>
      <div className={`${mainClass}__header`}>
        <MinimizeMenu />
        <div className={`${mainClass}__header__actions`}>{action}</div>
      </div>
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
    </div>
  );
};

export default EditorContentLayout;
