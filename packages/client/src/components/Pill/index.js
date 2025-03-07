import "./styles.scss";

import cx from "classnames";

const mainClass = "pill";

const Pill = ({
  label,
  onclick,
  icon,
  active,
  variant,
  color,
  textColor,
  readOnly,
  size,
}) => {
  return (
    <button
      onClick={onclick}
      type="button"
      disabled={readOnly}
      style={!!color ? { backgroundColor: color, color: textColor } : {}}
      className={cx(mainClass, {
        [`${mainClass}--active`]: !!active,
        [`${mainClass}--${variant}`]: !!variant,
        [`${mainClass}--read-only`]: !!readOnly,
        [`${mainClass}--${size}`]: !!size,
      })}
    >
      {icon}
      {label}
    </button>
  );
};

export default Pill;
