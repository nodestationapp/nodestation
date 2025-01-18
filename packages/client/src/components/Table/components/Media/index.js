import "./styles.scss";

import { ReactComponent as ProfilePlaceholder } from "assets/icons/profile-placeholder.svg";

const mainClass = "table__user-media";

const Media = ({ data }) => {
  return (
    <div className={mainClass}>
      <div className={`${mainClass}__photo`}>
        {!!data?.url ? <img src={data?.url} alt="" /> : <ProfilePlaceholder />}
      </div>
    </div>
  );
};

export default Media;
