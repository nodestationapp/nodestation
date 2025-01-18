import "./styles.scss";

import classnames from "classnames";

const mainClass = "loader";

const Loader = ({ size, center, color }) => {
  return (
    <div
      className={classnames(mainClass, {
        [`${mainClass}--${size}`]: !!size,
        [`${mainClass}--center`]: !!center,
        [`${mainClass}--${color}`]: !!color,
      })}
    >
      <span className={`${mainClass}__progress`}></span>
    </div>
  );
};

export default Loader;
