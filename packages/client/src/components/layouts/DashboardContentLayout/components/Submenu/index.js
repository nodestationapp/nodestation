import "./styles.scss";

import Toolbar from "components/TableStack/components/ToolBar";

const mainClass = "dashboard-content-layout__submenu";

const Submenu = ({ data, action }) => {
  return (
    <div className={mainClass}>
      <div className={`${mainClass}__content`}>
        <Toolbar
          menu={data?.menu}
          action={action}
          tableSettings={data?.tableSettings}
          addRowButton={data?.addRowButton}
        />
      </div>
    </div>
  );
};

export default Submenu;
