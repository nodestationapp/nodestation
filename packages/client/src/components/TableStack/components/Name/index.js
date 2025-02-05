import "./styles.scss";

const mainClass = "table__boolean";

const toggleBoolean = (value) => {
  switch (value) {
    case 0:
      return "FALSE";
    case 1:
      return "TRUE";
    default:
      return null;
  }
};

const Name = ({ data }) => {
  const boolean = toggleBoolean(data);
  if (!!!boolean) return <span>-</span>;

  return (
    <div className={mainClass}>
      <span>{toggleBoolean(data)}</span>
    </div>
  );
};

export default Name;
