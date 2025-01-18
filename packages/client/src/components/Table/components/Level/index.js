import "./styles.scss";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

const mainClass = "table__level";

const icon_render = (type) => {
  switch (type) {
    case "log":
      return <InformationCircleIcon color="#647182" />;
    case "info":
      return <InformationCircleIcon color="#1373E5" />;
    case "error":
      return <ExclamationCircleIcon color="#ED342D" />;
    case "warning":
      return <ExclamationTriangleIcon color="#EC932D" />;
    case "success":
      return <CheckCircleIcon color="#009E77" />;
    default:
      return null;
  }
};

const Level = ({ data }) => {
  return <div className={mainClass}>{icon_render(data)}</div>;
};

export default Level;
