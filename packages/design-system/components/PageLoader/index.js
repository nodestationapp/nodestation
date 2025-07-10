import "./styles.scss";

import classnames from "classnames";

const mainClass = "page-loader";

const PageLoader = ({ size, center, color, fullContainer }) => {
  return (
    <div
      className={classnames(mainClass, {
        [`${mainClass}--full-container`]: !!fullContainer,
      })}
    >
      <span
        className={classnames(`${mainClass}__dots`, {
          [`${mainClass}__dots--${size}`]: !!size,
          [`${mainClass}__dots--center`]: !!center,
          [`${mainClass}__dots--${color}`]: !!color,
        })}
      ></span>
    </div>
  );
};

export default PageLoader;
