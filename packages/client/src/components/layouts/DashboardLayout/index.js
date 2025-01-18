import "./styles.scss";

import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import ToolBar from "./components/ToolBar";
import AddCollectionModal from "./components/AddCollectionModal";

import { useOrganization } from "context/organization";

const mainClass = "dashboard-layout";

const DashboardLayout = () => {
  const { add_collection_modal, setAddCollectionModal } = useOrganization();
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
      {add_collection_modal && (
        <AddCollectionModal onClose={() => setAddCollectionModal(false)} />
      )}
    </>
  );
};

export default DashboardLayout;
