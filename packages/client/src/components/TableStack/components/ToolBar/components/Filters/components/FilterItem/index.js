import "./styles.scss";

import Pill from "components/Pill";
import Dropdown from "components/Dropdown";
import DropdownMenu from "components/DropdownMenu";
import FilterItemContent from "./components/FilterItemContent";

import field_type_data from "libs/field_type_data";

import { PlusIcon } from "@heroicons/react/24/outline";

const mainClass = "table__filter-item";

const FilterItem = ({
  index,
  columns,
  data,
  onRemove,
  filters,
  setFilters,
  saveTransaction,
}) => {
  const current_filter = filters?.[index];

  const formatted_columns = columns
    ?.map((item) => {
      const field = field_type_data?.find(
        (element) => element?.value === item?.type
      );

      return {
        ...field,
        label: item?.name,
        slug: item?.slug,
        type: item?.type,
        options: item?.options,
        relation: item?.relation,
        onClick: () => onFilterSelect(item?.slug),
      };
    })
    ?.filter((item) => item?.type !== "media");

  const selectedColumn = formatted_columns?.find(
    (item) => item?.slug === data?.field
  );

  const onFilterSelect = (value) => {
    const temp = [...filters];
    temp[index] = {
      ...temp[index],
      field: value,
    };

    temp.push({
      field: null,
      value: null,
    });

    setFilters(temp);
    saveTransaction({ filters: temp });
  };

  const onChangeHandler = (value) => {
    const temp = [...filters];
    temp[index] = {
      ...temp[index],
      value,
    };

    setFilters(temp);
    saveTransaction({ filters: temp });
  };

  return (
    <div className={mainClass}>
      <Dropdown
        position={[null, "left"]}
        preventChildrenClick={true}
        button={
          <Pill
            variant="rounded"
            active={!!data?.value}
            label={selectedColumn?.label || "Add filter"}
            icon={!!data?.field ? selectedColumn?.icon : <PlusIcon />}
          />
        }
      >
        {!!data?.field ? (
          <FilterItemContent
            data={data}
            onRemove={onRemove}
            value={current_filter}
            selectedColumn={selectedColumn}
            onChangeHandler={onChangeHandler}
          />
        ) : (
          <DropdownMenu items={formatted_columns} />
        )}
      </Dropdown>
    </div>
  );
};

export default FilterItem;
