import "./styles.scss";
import MethodSelect from "components/MethodSelect";

const mainClass = "table__user-endpoint-name";

const EndpointName = ({ data }) => {
  return (
    <div className={mainClass}>
      <MethodSelect method={data?.name} read_only />
      <span>{data?.path}</span>
    </div>
  );
};

export default EndpointName;
