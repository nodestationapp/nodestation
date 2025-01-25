import "./styles.scss";
import MethodSelect from "components/MethodSelect";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const mainClass = "table__user-endpoint-name";

const EndpointName = ({ data }) => {
  return (
    <div className={mainClass}>
      <MethodSelect method={data?.method} read_only />
      <span>
        {data?.name}
        {data?.error && <ExclamationCircleIcon />}
      </span>
    </div>
  );
};

export default EndpointName;
