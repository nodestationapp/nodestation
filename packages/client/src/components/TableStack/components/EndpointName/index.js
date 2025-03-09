import "./styles.scss";
import MethodSelect from "components/MethodSelect";

const mainClass = "table__user-endpoint-name";

const EndpointName = ({ data }) => {
  const method = data?.metadata?.path?.split("/")?.pop();

  const path = data?.metadata?.path?.split("/");
  path.splice(0, 2);
  path.pop();

  const formatted_path = path?.join("/");

  return (
    <div className={mainClass}>
      <MethodSelect method={method} read_only />
      <span>/{formatted_path}</span>
    </div>
  );
};

export default EndpointName;
