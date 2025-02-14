import "./styles.scss";

const mainClass = "table-skeleton";

const TableSkeleton = () => {
  return (
    <div className={mainClass}>
      <div className={`${mainClass}__row`}>
        <div className={`skeleton`}></div>
      </div>
      <div className={`${mainClass}__row`}>
        <div className={`skeleton`}></div>
      </div>
    </div>
  );
};

export default TableSkeleton;
