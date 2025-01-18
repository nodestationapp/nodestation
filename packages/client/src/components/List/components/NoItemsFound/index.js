import "./styles.scss";

import classnames from "classnames";

import { ArchiveBoxIcon } from "@heroicons/react/24/outline";

const mainClass = "list__no-items-found";

const NoItemsFound = ({ extras }) => {
  return (
    <div className={mainClass}>
      <div className={`${mainClass}__content`}>
        <div
          className={classnames(`${mainClass}__content__info`, {
            [`${mainClass}__content__info--center`]: !!!extras,
          })}
        >
          <ArchiveBoxIcon />
          <span>No items found</span>
        </div>
        {!!extras && (
          <div className={`${mainClass}__content__extras`}>{extras}</div>
        )}
      </div>
    </div>
  );
};

export default NoItemsFound;
