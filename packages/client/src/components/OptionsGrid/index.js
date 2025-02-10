import "./styles.scss";

import Select from "components/form/Select";
import DropdownInput from "components/form/DropdownInput";
import DragOrderSelect from "components/form/DragOrderSelect";

const mainClass = "endpoints-options";

const inputTypeRender = (data) => {
  switch (data?.type) {
    case "drag-order":
      return (
        <DragOrderSelect
          noArrow
          withAddAction
          placeholder="Empty"
          value={data?.value}
          multi={data?.multi}
          options={data?.options}
          onChange={(value) => data?.onChange(value)}
        />
      );
    case "dropdown-input":
      return (
        <DropdownInput
          noArrow
          value={data?.value}
          placeholder="Empty"
          validate={data?.validate}
          onChange={({ target }) => data?.onChange(target?.value)}
        />
      );
    default:
      return (
        <Select
          noArrow
          placeholder="Empty"
          value={data?.value}
          multi={data?.multi}
          options={data?.options}
          onChange={({ target }) => data?.onChange(target?.value)}
        />
      );
  }
};

const OptionsGrid = ({ options }) => {
  return (
    <>
      <div className={mainClass}>
        {options?.map((item, index) => (
          <div key={index} className={`${mainClass}__column`}>
            {item?.map((element, index) => (
              <div key={index} className={`${mainClass}__column__item`}>
                <span className={`${mainClass}__column__item__label`}>
                  {element?.icon}
                  {element?.label}
                </span>
                <div className={`${mainClass}__column__item__value`}>
                  {inputTypeRender(element)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default OptionsGrid;
