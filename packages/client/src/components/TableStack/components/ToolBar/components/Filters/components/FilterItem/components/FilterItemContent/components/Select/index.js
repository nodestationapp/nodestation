import "./styles.scss";

import Pill from "components/Pill";
import Checkbox from "components/form/Checkbox";

const mainClass = "filter-select-input";

const FilterSelectInput = ({ options, onChange, currentValue = [] }) => {
  const onChangeHandler = (value) => {
    let temp = Array.isArray(currentValue)
      ? [...currentValue]
      : !!currentValue
      ? [currentValue]
      : [];

    const index = temp.findIndex((item) => item === value);

    if (index === -1) {
      temp.push(value);
    } else {
      temp.splice(index, 1);
    }

    onChange(temp);
  };

  return (
    <div className={mainClass}>
      {options?.map((item) => (
        <Checkbox
          key={item?.value}
          checked={currentValue?.includes(item?.value)}
          label={
            <Pill
              label={item?.label}
              color={item?.color}
              textColor="#F0F1F3"
              onclick={() => onChangeHandler(item?.value)}
            />
          }
        />
      ))}
    </div>
  );
};

export default FilterSelectInput;
