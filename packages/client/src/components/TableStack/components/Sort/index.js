import "./styles.scss";

import cx from "classnames";

import {
  ArrowDownIcon,
  ArrowsUpDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";

const mainClass = "table__sort";

const arrowOptions = (desc) => {
  switch (desc) {
    case false:
      return <ArrowUpIcon />;
    case true:
      return <ArrowDownIcon />;
    default:
      return <ArrowsUpDownIcon />;
  }
};

const Sort = ({ id, data }) => {
  const isSorting = id === data?.[0]?.id;

  const arrow = arrowOptions(isSorting ? data?.[0]?.desc : null);

  return (
    <div
      className={cx(mainClass, {
        [`${mainClass}--is-sorting`]: !!isSorting,
      })}
    >
      {arrow}
    </div>
  );
};

export default Sort;
