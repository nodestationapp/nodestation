import "./styles.scss";

import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import ToolBar from "./components/ToolBar";
import AddTableModal from "./components/AddTableModal";

import { useOrganization } from "context/organization";
import TableWrapperProvider from "context/client/table-wrapper";

const mainClass = "dashboard-layout";

const DashboardLayout = () => {
  const { add_table_modal, setAddTableModal } = useOrganization();
  const [mobile_sidebar_open, setMobileSidebarOpen] = useState(false);

  return (
    <TableWrapperProvider>
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
        <AddTableModal
          type={add_table_modal}
          onClose={() => setAddTableModal(false)}
        />
      )}
    </TableWrapperProvider>
  );
};

export default DashboardLayout;
