import "./styles.scss";

import { ReactComponent as ProfilePlaceholder } from "assets/icons/profile-placeholder.svg";

const mainClass = "table__user-profile";

const UserProfile = ({ data }) => {
  console.log(data);
  return (
    <div className={mainClass}>
      <div className={`${mainClass}__photo`}>
        {!!data?.photo ? (
          <img src={data?.photo?.url} alt="" />
        ) : (
          <ProfilePlaceholder />
        )}
      </div>
      <span>{`${data?.first_name} ${data?.last_name}`}</span>
    </div>
  );
};

export default UserProfile;
