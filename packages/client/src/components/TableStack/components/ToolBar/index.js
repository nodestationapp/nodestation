import "./styles.scss";

import Button from "components/Button";
import IconButton from "components/IconButton";
import IconButtonMenu from "components/IconButtonMenu";

import {
  EllipsisHorizontalIcon,
  // MagnifyingGlassIcon,
  // AdjustmentsHorizontalIcon
} from "@heroicons/react/24/outline";

const mainClass = "table__toolbar";

const Toolbar = ({
  addRowButton,
  asideMenu,
  // onSearch,
  selectAction,
  selectedRows,
  clearSelection,
}) => {
  return (
    <div className={mainClass}>
      <div className={`${mainClass}__main`}>
        {!!selectedRows?.length && (
          <div className={`${mainClass}__main__select-action`}>
            <span className="small">Selected {selectedRows?.length}</span>
            <div className={`${mainClass}__main__select-action__options`}>
              {selectAction?.map((item, index) => (
                <IconButton
                  key={index}
                  size="small"
                  icon={item?.icon}
                  onClick={() => item?.onClick(selectedRows, clearSelection)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={`${mainClass}__aside`}>
        {/* {!!onSearch && (
          <IconButton size="small" icon={<MagnifyingGlassIcon />} />
        )} */}
        {!!asideMenu && (
          <IconButtonMenu icon={<EllipsisHorizontalIcon />} data={asideMenu} />
        )}
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
