import "./styles.scss";

import Pill from "components/Pill";
import Input from "components/form/Input";
import Dropdown from "components/Dropdown";
import IconButton from "components/IconButton";
import DropdownMenu from "components/DropdownMenu";

import field_type_data from "libs/field_type_data";

import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

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
  const formatted_columns = columns?.map((item) => {
    const field = field_type_data?.find(
      (element) => element?.value === item?.type
    );

    return {
      ...field,
      label: item?.name,
      slug: item?.slug,
      onClick: () => onFilterSelect(item?.slug),
    };
  });

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

  const onTypeHandler = (e) => {
    const temp = [...filters];
    temp[index] = {
      ...temp[index],
      value: e?.target?.value,
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
            <Input
              placeholder="Type a value"
              size="small"
              variant="dark"
              name={data?.field}
              value={data?.value}
              onChange={(e) => onTypeHandler(e)}
            />
          </div>
        ) : (
          <DropdownMenu items={formatted_columns} />
        )}
      </Dropdown>
    </div>
  );
};

export default FilterItem;
