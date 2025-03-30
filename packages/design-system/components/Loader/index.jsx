import "./styles.scss";

import classnames from "classnames";
import PropTypes from "prop-types";

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

Loader.propTypes = {
  center: PropTypes.bool,
  size: PropTypes.oneOf(["small","large"]),
  color: PropTypes.oneOf(["dark", "light"]),
};
