import "./styles.scss";

import { useRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Icon from "../Icon";
import Loader from "../Loader";

const mainClass = "button";

const Button = ({
  children,
  fullWidth,
  variant,
  onClick,
  loading,
  disabled,
  icon,
  size,
  active,
  ...rest
}) => {
  const ref = useRef();
  const className = classnames(mainClass, {
    [`${mainClass}--icon-button`]: !!!children && !!icon,
    [`${mainClass}--full-width`]: !!fullWidth,
    [`${mainClass}--${variant}`]: !!variant,
    [`${mainClass}--disabled`]: !!disabled,
    [`${mainClass}--${size}`]: !!size,
    [`${mainClass}--active`]: !!active,
  });

  const props = {
    className,
    ref,
    style: { minWidth: ref?.current?.offsetWidth },
    onClick,
    type: rest.type || "button",
    ...rest,
  };

  return (
    <button {...props} disabled={disabled || !!loading}>
    {loading ? (
      <Loader />
    ) : (
      <>
        {icon && <Icon name={icon} />}
        {children}
      </>
    )}
  </button>
  )
};

export default Button;

Button.propTypes = {
  icon: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  children: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium"]),
  variant: PropTypes.oneOf(["transparent-gray", "transparent", "primary"]),
};
