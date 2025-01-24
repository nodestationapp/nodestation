import "./styles.scss";

import Button from "components/Button";
import IconButtonMenu from "components/IconButtonMenu";

import {
  EllipsisHorizontalIcon,
  // MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const mainClass = "table__toolbar";

const Toolbar = ({ addRowButton, asideMenu, onSearch }) => {
  return (
    <div className={mainClass}>
      <div className={`${mainClass}__main`}>
        {/* <Button
          icon={<AdjustmentsHorizontalIcon />}
          variant="no-border"
          size="small"
        >
          Filters
        </Button> */}
      </div>
      <div className={`${mainClass}__aside`}>
        {/* {!!onSearch && (
          <IconButton size="small" icon={<MagnifyingGlassIcon />} />
        )} */}
        <IconButtonMenu icon={<EllipsisHorizontalIcon />} data={asideMenu} />
        {!!addRowButton && (
          <Button onClick={addRowButton?.onClick} icon={addRowButton?.icon}>
            {addRowButton?.label || "New"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
