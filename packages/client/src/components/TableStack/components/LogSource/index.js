import "./styles.scss";

import cx from "classnames";
import MethodSelect from "components/MethodSelect";

const mainClass = "table__log-source";

const method_render = (data) => {
  switch (data) {
    case "POST":
    case "GET":
    case "PUT":
    case "DELETE":
      return (
        <>
          <MethodSelect method={data?.toLowerCase()} read_only size="small" />
        </>
      );
    default:
      return null;
  }
};

const LogSource = ({ data }) => {
  return (
    <div
      className={cx(mainClass, {
        [`${mainClass}--${data?.source?.type}`]: !!data?.source?.type,
      })}
    >
      {method_render(data)}
    </div>
  );
};

export default LogSource;
