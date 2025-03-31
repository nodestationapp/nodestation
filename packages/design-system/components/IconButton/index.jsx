import "./styles.scss";

import PropTypes from "prop-types";
import classnames from "classnames";

import Icon from "../Icon";

const mainClass = "icon-button";

const IconButton = ({
  icon,
  onClick,
  href,
  size,
  type = "button",
  variant,
  active,
  ...rest
}) => {
  return (
    <button className={classnames(mainClass, {
      [`${mainClass}--${size}`]: !!size,
      [`${mainClass}--active`]: !!active,
      [`${mainClass}--${variant}`]: !!variant,
    })} onClick={onClick} type={type} {...rest}>
      <div className={`${mainClass}__content`}>
        {icon && <Icon name={icon} />}
      </div>
    </button>
  );
};

export default IconButton;

IconButton.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
  href: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  type: PropTypes.string,
  variant: PropTypes.oneOf(["default", "error"]),
  active: PropTypes.bool,
};
