import "./styles.scss";
import cx from "classnames";

import { ServerStackIcon } from "@heroicons/react/24/outline";
import { ReactComponent as PlaceohlderIcon } from "assets/icons/profile-placeholder.svg";

const mainClass = "dashboard-layout__avatar";

const Avatar = ({
  user,
  photo,
  bottom,
  read_only,
  only_photo,
  type,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(mainClass, {
        [`${mainClass}--read-only`]: !!read_only,
      })}
    >
      <div className={`${mainClass}__image`}>
        {photo ? (
          <img src={photo} alt="" />
        ) : type === "organization" ? (
          <div className={`${mainClass}__image__icon`}>
            <ServerStackIcon />
          </div>
        ) : (
          <PlaceohlderIcon />
        )}
      </div>
      {!!!only_photo && (
        <div className={`${mainClass}__text`}>
          <span>{user}</span>
          {!!bottom && <small>{bottom}</small>}
        </div>
      )}
    </button>
  );
};

export default Avatar;
