import { useEffect, useState } from "react";
import "./styles.scss";

const mainClass = "table-skeleton";

const TableSkeleton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (!!!visible) return null;

  return (
    <div className={mainClass}>
      <div className={`${mainClass}__row`}>
        <div className={`skeleton`}></div>
      </div>
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
