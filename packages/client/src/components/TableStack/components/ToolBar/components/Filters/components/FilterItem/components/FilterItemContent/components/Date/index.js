import "./styles.scss";

import moment from "moment";
import Input from "components/form/Input";

const mainClass = "filter-select-input";

const FilterDate = ({ value = [], onChange }) => {
  const onChangeHandler = (newDate, index) => {
    let temp = value || [];

    const formatted_value = moment(newDate).unix();
    temp[index] = formatted_value;

    onChange(temp);
  };

  const value_from = !!value?.[0]
    ? moment?.unix(value?.[0])?.format("YYYY-MM-DDTHH:mm")
    : null;

  const value_to = !!value?.[1]
    ? moment?.unix(value?.[1])?.format("YYYY-MM-DDTHH:mm")
    : null;

  return (
    <div className={mainClass}>
      <Input
        variant="brighter"
        value={value_from}
        type="datetime-local"
        onChange={(e) => onChangeHandler(e.target.value, 0)}
      />
      <Input
        variant="brighter"
        value={value_to}
        onChange={(e) => onChangeHandler(e.target.value, 1)}
        type="datetime-local"
      />
    </div>
  );
};

export default FilterDate;
