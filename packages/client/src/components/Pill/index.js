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
      style={
        !!color
          ? {
              backgroundColor:
                variant === "status" ? `rgba(${color}, 0.2)` : color,
              color: `rgba(${textColor}, 1)`,
            }
          : {}
      }
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
