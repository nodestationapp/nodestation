import "./styles.scss";

import { PhotoIcon } from "@heroicons/react/24/outline";

const mainClass = "table__user-media";

const Media = ({ data }) => {
  return (
    <div className={mainClass}>
      <div className={`${mainClass}__photo`}>
        {!!data?.url ? (
          <img src={data?.url} alt="" />
        ) : (
          <div className={`${mainClass}__photo__placeholder`}>
            <PhotoIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default Media;
