import "./styles.scss";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

const mainClass = "alert";

const Alert = ({ text, action }) => {
  return (
    <div className={mainClass}>
      <div className={`${mainClass}__text`}>
        <ExclamationCircleIcon color="#FFD10C" />
        <span>{text}</span>
      </div>
      {action}
    </div>
  );
};

export default Alert;
