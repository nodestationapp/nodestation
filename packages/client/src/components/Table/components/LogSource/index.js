import "./styles.scss";

import cx from "classnames";
import MethodSelect from "components/MethodSelect";
import {
  AtSymbolIcon,
  PaperAirplaneIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const mainClass = "table__log-source";

const icon_render = (type) => {
  switch (type) {
    case "forms":
      return <PaperAirplaneIcon />;
    case "emails":
      return <AtSymbolIcon />;
    case "auth":
      return <UsersIcon />;
    default:
      return null;
  }
};

const LogSource = ({ data }) => {
  const icon = icon_render(data?.source?.type);

  return (
    <div
      className={cx(mainClass, {
        [`${mainClass}--${data?.source?.type}`]: !!data?.source?.type,
      })}
    >
      {data?.source?.type === "endpoint" ? (
        <>
          <MethodSelect
            method={data?.req?.method}
            read_only
            size="small"
            variant="transparent"
          />
          <span title={data?.source?.path}>{data?.source?.path}</span>
        </>
      ) : (
        <>
          {icon}
          <span title={data?.source?.name}>{data?.source?.name}</span>
        </>
      )}
    </div>
  );
};

export default LogSource;
