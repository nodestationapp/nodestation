import "./styles.scss";

import { ReactComponent as ProfilePlaceholder } from "assets/icons/profile-placeholder.svg";

const mainClass = "table__user-profile";

const UserProfile = ({ data }) => {
  return (
    <div className={mainClass}>
      <div className={`${mainClass}__photo`}>
        {!!data?.photo ? (
          <img src={data?.photo?.url} alt="" />
        ) : (
          <ProfilePlaceholder />
        )}
      </div>
      <span>{data?.name}</span>
    </div>
  );
};

export default UserProfile;
