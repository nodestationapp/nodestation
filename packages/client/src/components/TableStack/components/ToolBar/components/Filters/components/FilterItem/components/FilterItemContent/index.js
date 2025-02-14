import "./styles.scss";

import Input from "components/form/Input";
import IconButton from "components/IconButton";
import FilterSelectInput from "./components/Select";

import { TrashIcon } from "@heroicons/react/24/outline";
import Select from "components/form/Select";
import FilterDate from "./components/Date";

const mainClass = "table__filter-item";

const filterInputRender = (column, onChangeHandler, value) => {
  switch (column?.value) {
    case "select":
      return (
        <FilterSelectInput
          currentValue={value}
          options={column?.options}
          onChange={onChangeHandler}
        />
      );
    case "id":
    case "text":
    case "numeric":
    case "json":
      return (
        <Input
          value={value}
          placeholder="Type a value"
          onChange={(e) => onChangeHandler(e.target.value)}
        />
      );
    case "date":
      return (
        <FilterDate
          value={value}
          onChange={(value) => onChangeHandler(value)}
        />
      );
    case "boolean":
      return (
        <Select
          value={value}
          options={[
            {
              label: "NULL",
              value: "null",
            },
            {
              label: "TRUE",
              value: 1,
            },
            {
              label: "FALSE",
              value: 0,
            },
          ]}
          placeholder="Select a value"
          onChange={(e) => onChangeHandler(e.target.value)}
        />
      );
    default:
      return null;
  }
};

const FilterItemContent = ({
  data,
  value,
  onRemove,
  selectedColumn,
  onChangeHandler,
}) => {
  const filterInput = filterInputRender(
    selectedColumn,
    onChangeHandler,
    value?.value
  );

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
    </div>
  );
};

export default FilterItemContent;
