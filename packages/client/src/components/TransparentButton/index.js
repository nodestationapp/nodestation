import "./styles.scss";
import classnames from "classnames";

const mainClass = "transparent-button";

const TransparentButton = ({
  label,
  icon,
  textTransform,
  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={classnames(mainClass, {
        [`${mainClass}--${textTransform}`]: !!textTransform,
      })}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
};

export default TransparentButton;
