import "./styles.scss";

import classnames from "classnames";
import { Link } from "react-router-dom";

const mainClass = "icon-button";

const IconButton = ({
  icon,
  badgeContent,
  onClick,
  href,
  size,
  type = "button",
  variant,
  active,
  ...rest
}) => {
  const content_props = {
    icon,
    badgeContent,
    size,
  };

  const classes = classnames(mainClass, {
    [`${mainClass}--${size}`]: !!size,
    [`${mainClass}--${variant}`]: !!variant,
    [`${mainClass}--active`]: !!active,
  });

  return href ? (
    <Link className={classes} to={href} {...rest}>
      <IconButtonContent {...content_props} />
    </Link>
  ) : (
    <button className={classes} onClick={onClick} type={type} {...rest}>
      <IconButtonContent {...content_props} />
    </button>
  );
};

const IconButtonContent = ({ icon, badgeContent }) => (
  <div className={`${mainClass}__content`}>
    {icon}
    {!!badgeContent && (
      <div className={`${mainClass}__badge`}>
        <span>{badgeContent}</span>
      </div>
    )}
  </div>
);

export default IconButton;
