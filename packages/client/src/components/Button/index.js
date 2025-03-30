import "./styles.scss";

import { useRef } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";

import Loader from "components/Loader";

const mainClass = "button";

const Button = ({
  children,
  fullWidth,
  variant,
  onClick,
  type = "button",
  href,
  loading,
  disabled,
  icon,
  size,
  active,
  external_href,
  id,
}) => {
  const ref = useRef();
  const className = classnames(mainClass, {
    [`${mainClass}--icon-button`]: !!!children && icon,
    [`${mainClass}--full-width`]: !!fullWidth,
    [`${mainClass}--${variant}`]: !!variant,
    [`${mainClass}--disabled`]: !!disabled,
    [`${mainClass}--${size}`]: !!size,
    [`${mainClass}--active`]: !!active,
  });

  const props = {
    id,
    className,
    ref,
    style: { minWidth: ref?.current?.offsetWidth },
    onClick,
  };

  return href ? (
    external_href ? (
      <a {...props} href={href} target="_blank" rel="noopener noreferrer">
        {icon}
        {children}
      </a>
    ) : (
      <Link {...props} to={href}>
        {icon}
        {children}
      </Link>
    )
  ) : (
    <button {...props} type={type} disabled={disabled || !!loading}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
