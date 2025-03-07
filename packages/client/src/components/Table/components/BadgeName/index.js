import "./styles.scss";

const mainClass = "table__user-badge-name";

const BadgeName = ({ data }) => {
  const count = parseInt(data?.count);

  return (
    <div className={mainClass}>
      <span>{data?.name}</span>
      {!!count && <div className={`${mainClass}__badge`}>{count}</div>}
    </div>
  );
};

export default BadgeName;
