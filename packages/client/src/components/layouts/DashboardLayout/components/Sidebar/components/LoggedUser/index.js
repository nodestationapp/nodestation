import "./styles.scss";

import cx from "classnames";

import Avatar from "../Avatar";
import IconButton from "components/IconButton";

import {
  Cog6ToothIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

import { useApp } from "context/app";

const mainClass = "logged-user";

const LoggedUser = () => {
  const { user, handleLogout } = useApp();

  return (
    <div className={cx(mainClass)}>
      <div className={`${mainClass}__left`}>
        <Avatar
          read_only
          photo={user?.photo?.url}
          user={`${user?.first_name} ${user?.last_name}`}
        />
      </div>
      <div className={`${mainClass}__right`}>
        <IconButton size="small" href="/settings" icon={<Cog6ToothIcon />} />
        <IconButton
          size="small"
          onClick={handleLogout}
          icon={<ArrowLeftStartOnRectangleIcon />}
        />
      </div>
    </div>
  );
};

export default LoggedUser;
