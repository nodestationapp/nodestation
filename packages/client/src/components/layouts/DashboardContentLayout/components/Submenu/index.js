import "./styles.scss";

import classnames from "classnames";
import Toolbar from "components/TableStack/components/ToolBar";
import { Link, useLocation } from "react-router-dom";

const mainClass = "dashboard-content-layout__submenu";

const Submenu = ({ data, action }) => {
  const { pathname } = useLocation();

  return (
    <div className={mainClass}>
      <div className={`${mainClass}__content`}>
        <Toolbar
          menu={data?.menu}
          action={action}
          tableSettings={data?.tableSettings}
          // onSearch={onSearch}
          // asideMenu={asideMenu}
          // tableSettings={tableSettings}
          // clearSelection={() => table.setRowSelection({})}
          // selectAction={selectAction}
          addRowButton={data?.addRowButton}
          // selectedRows={table.getSelectedRowModel()?.rows}
        />
      </div>
    </div>
  );
};

export default Submenu;
