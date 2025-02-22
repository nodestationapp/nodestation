import "./styles.scss";

import Menu from "./components/Menu";
import Avatar from "./components/Avatar";
import Dropdown from "components/Dropdown";

import { useApp } from "context/app";

const mainClass = "dashboard-layout-sidebar";

const Sidebar = () => {
  const { user } = useApp();

  return (
    <>
      <div className={mainClass}>
        <div className={`${mainClass}__header`}>
          <Dropdown
            button={<Avatar user={user?.project_name} type="organization" />}
          ></Dropdown>
        </div>
        <Menu />
      </div>
    </>
  );
};

export default Sidebar;
