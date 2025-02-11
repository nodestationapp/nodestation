import "./styles.scss";

import Pill from "components/Pill";
import Checkbox from "components/form/Checkbox";

const mainClass = "filter-select-input";

const FilterSelectInput = ({ options }) => {
  return (
    <div className={mainClass}>
      {options?.map((item) => (
        <Checkbox
          key={item?.value}
          label={
            <Pill label={item?.label} color={item?.color} textColor="#F0F1F3" />
          }
        />
      ))}
    </div>
  );
};

export default FilterSelectInput;
