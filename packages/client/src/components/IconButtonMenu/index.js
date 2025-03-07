import "./styles.scss";

import Dropdown from "components/Dropdown";
import IconButton from "components/IconButton";
import DropdownMenu from "components/DropdownMenu";

const mainClass = "icon-button-menu";

const IconButtonMenu = ({ icon, data, component }) => {
  return (
    <div className={mainClass}>
      <Dropdown
        position={[null, "right"]}
        button={<IconButton size="small" icon={icon} />}
      >
        {component || <DropdownMenu items={data} />}
      </Dropdown>
    </div>
  );
};

export default IconButtonMenu;
