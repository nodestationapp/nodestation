import "./styles.scss";

import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import AddTableModal from "./components/AddTableModal";
import ToolBar from "../DashboardLayout/components/ToolBar";

import { useOrganization } from "context/organization";
import TableWrapperProvider from "context/client/table-wrapper";

const mainClass = "editor-layout";

const EditorLayout = () => {
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
        <AddTableModal onClose={() => setAddTableModal(false)} />
      )}
    </TableWrapperProvider>
  );
};

export default EditorLayout;
