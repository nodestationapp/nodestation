import "./styles.scss";

import PropTypes from "prop-types";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

import Button from "../Button";

const mainClass = "alert";

const Alert = ({ text, action }) => {
  return (
    <div className={mainClass}>
      <div className={`${mainClass}__text`}>
        <ExclamationCircleIcon color="#FFD10C" />
        <span>{text}</span>
      </div>
      <Button variant="transparent" onClick={action?.onClick}>
      {action?.label}
      </Button>
    </div>
  );
};

export default Alert;

Alert.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.object,
};
