import "./styles.scss";

import Dropdown from "components/Dropdown";
import Searcher from "./components/Searcher";
import DropdownMenu from "components/DropdownMenu";
import Avatar from "components/layouts/DashboardLayoutOld/components/Sidebar/components/Avatar";

import { useApp } from "context/app";

import {
  Cog6ToothIcon,
  ArrowUpOnSquareIcon,
} from "@heroicons/react/24/outline";

const mainClass = "title-bar";

const TitleBar = () => {
  const { user, handleLogout } = useApp();

  const basics_menu_items = [
    {
      icon: <Cog6ToothIcon />,
      label: "Settings",
      href: "/settings",
    },
    {
      icon: <ArrowUpOnSquareIcon />,
      label: "Logout",
      onClick: handleLogout,
      type: "warning",
    },
  ];
  return (
    <div className={mainClass}>
      <div className={`${mainClass}__left`}></div>
      <Searcher />
      <div className={`${mainClass}__right`}>
        <Dropdown
          position={[null, "right"]}
          button={
            <Avatar
              only_photo
              photo={user?.photo?.url}
              user={`${user?.first_name} ${user?.last_name}`}
            />
          }
        >
          <DropdownMenu items={basics_menu_items} />
        </Dropdown>
      </div>
    </div>
  );
};

export default TitleBar;
