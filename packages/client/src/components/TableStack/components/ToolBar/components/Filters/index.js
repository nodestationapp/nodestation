import "./styles.scss";

import { useState } from "react";

import Pill from "components/Pill";
import Input from "components/form/Input";
import Dropdown from "components/Dropdown";
import IconButton from "components/IconButton";
import DropdownMenu from "components/DropdownMenu";

import field_type_data from "libs/field_type_data";

import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

const mainClass = "table__filters";

const Filters = ({ columns }) => {
  const [activeFilter, setActiveFilter] = useState(null);

  const formatted_columns = columns?.map((item) => {
    const field = field_type_data?.find(
      (element) => element?.value === item?.type
    );

    return {
      ...field,
      label: item?.value,
      onClick: () => setActiveFilter(item?.value),
    };
  });

  return (
    <div className={mainClass}>
      <Dropdown
        position={[null, "left"]}
        preventChildrenClick={true}
        button={<Pill label="Add filter" icon={<PlusIcon />} />}
      >
        {!!activeFilter ? (
          <div className={`${mainClass}__content`}>
            <div className={`${mainClass}__content__header`}>
              <span>
                {activeFilter} <strong>contains</strong>
              </span>
              <IconButton
                icon={<TrashIcon />}
                size="small"
                onClick={() => setActiveFilter(null)}
              />
            </div>
            <Input placeholder="Type a value" size="small" variant="dark" />
          </div>
        ) : (
          <DropdownMenu items={formatted_columns} />
        )}
      </Dropdown>
    </div>
  );
};

export default Filters;
