import "./styles.scss";
import MethodSelect from "components/MethodSelect";

const mainClass = "table__user-endpoint-name";

const EndpointName = ({ data }) => {
  return (
    <div className={mainClass}>
      <MethodSelect method={data?.metadata?.method} read_only />
      <span>{data?.name}</span>
    </div>
  );
};

export default EndpointName;
