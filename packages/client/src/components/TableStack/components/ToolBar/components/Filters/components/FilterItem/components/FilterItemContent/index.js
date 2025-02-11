import "./styles.scss";

import IconButton from "components/IconButton";
import FilterSelectInput from "./components/Select";

import { TrashIcon } from "@heroicons/react/24/outline";

const mainClass = "table__filter-item";

const filterInputRender = (column) => {
  switch (column?.value) {
    case "select":
      return <FilterSelectInput options={column?.options} />;
    default:
      return null;
  }
};

const FilterItemContent = ({
  data,
  selectedColumn,
  onRemove,
  // onTypeHandler,
}) => {
  const filterInput = filterInputRender(selectedColumn);

  return (
    <div className={`${mainClass}__content`}>
      <div className={`${mainClass}__content__header`}>
        <span>
          {selectedColumn?.label} <strong>contains</strong>
        </span>
        <IconButton
          icon={<TrashIcon />}
          size="small"
          onClick={() => onRemove(data?.field)}
        />
      </div>
      {filterInput}
      {/* <Input
        placeholder="Type a value"
        size="small"
        variant="dark"
        name={data?.field}
        value={data?.value}
        onChange={(e) => onTypeHandler(e)}
      /> */}
    </div>
  );
};

export default FilterItemContent;
