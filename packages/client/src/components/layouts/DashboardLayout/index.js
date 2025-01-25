import "./styles.scss";

import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import ToolBar from "./components/ToolBar";
import AddTableModal from "./components/AddTableModal";

import { useOrganization } from "context/organization";

const mainClass = "dashboard-layout";

const DashboardLayout = () => {
  const { add_table_modal, setAddTableModal } = useOrganization();
  const [mobile_sidebar_open, setMobileSidebarOpen] = useState(false);

  return (
    <>
      <div className={mainClass}>
        <div className={`${mainClass}__wrapper`}>
          <Sidebar
            mobile_open={mobile_sidebar_open}
            setMobileSidebarOpen={setMobileSidebarOpen}
          />
          <div className={`${mainClass}__content`}>
            <Outlet />
          </div>
        </div>
        <ToolBar />
      </div>
      {add_table_modal && (
        <AddTableModal onClose={() => setAddTableModal(false)} />
      )}
    </>
  );
};

export default DashboardLayout;
