import "./styles.scss";

import classnames from "classnames";
import { useState, useRef } from "react";

import useOnScreen from "libs/helpers/useOnScreen";
import useClickOutside from "libs/helpers/useClickOutside";

import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const mainClass = "select";

const Select = ({
  name,
  label,
  options = [],
  placeholder,
  required,
  selected,
  onChange,
  disabled,
  value,
  touched,
  error,
  hideError,
  id,
  variant,
  noArrow,
  multi,
  CustomButton,
}) => {
  const is_error = !!!hideError && touched && !!error;

  const [select_open, setSelectOpen] = useState(false);

  const ref = useRef();
  const button_ref = useRef();

  useClickOutside(ref, () => {
    setSelectOpen(false);
  });

  const can_bottom = useOnScreen(button_ref);
  const current_value = !!multi
    ? options?.filter((item) => value?.includes(item?.value))
    : [options?.find((item) => item?.value === value)];

  const onChangeHandler = (item) => {
    if (multi) {
      let temp = [...value];

      const index = temp?.findIndex((element) => element === item?.value);
      if (index === -1) {
        temp.push(item?.value);
      } else {
        temp.splice(index, 1);
      }

      onChange({ target: { name: item?.name, value: temp } });
    } else {
      onChange({ target: { name: item?.name, value: item?.value } });
      setSelectOpen((prev) => !prev);
    }
  };

  return (
    <div
      ref={ref}
      id={id}
      className={classnames(mainClass, {
        [`${mainClass}--active`]: !!select_open,
        [`${mainClass}--selected`]: !!selected,
        [`${mainClass}--top`]: !!!can_bottom,
        [`${mainClass}--disabled`]: !!disabled,
        [`${mainClass}--error`]: !!is_error,
        [`${mainClass}--empty`]: value === null,
        [`${mainClass}--filled`]: value !== null,
        [`${mainClass}--${variant}`]: !!variant,
      })}
    >
      {!!label && (
        <label>
          {label}
          {!!required && <span>*</span>}
        </label>
      )}
      {!!CustomButton ? (
        <div
          ref={button_ref}
          className={`${mainClass}__custom-button`}
          onClick={() => setSelectOpen((prev) => !prev)}
        >
          <CustomButton ref={button_ref} />
        </div>
      ) : (
        <button
          ref={button_ref}
          type="button"
          onClick={() => setSelectOpen((prev) => !prev)}
        >
          <span>
            {current_value?.icon}
            {value !== null && (
              <>
                {current_value?.map((item) => item?.label)?.join(", ") ||
                  placeholder}
              </>
            )}
          </span>
          {!!!noArrow && <ChevronDownIcon />}
        </button>
      )}
      {/* {customButton()} */}

      {select_open && (
        <div className={`${mainClass}__options`}>
          <div className={`${mainClass}__options__wrapper`}>
            {options?.map((item, index) => (
              <button
                type="button"
                key={index}
                className={classnames(`${mainClass}__options__item`, {
                  [`${mainClass}__options__item--selected`]:
                    selected?.value === item?.value,
                })}
                onClick={() => onChangeHandler({ name, value: item?.value })}
              >
                {item?.icon}
                {item?.label}
                {current_value?.find(
                  (element) => element?.value === item?.value
                ) && (
                  <div className={`${mainClass}__options__item__selected-icon`}>
                    <CheckIcon />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      {!!is_error && <small className={`${mainClass}__error`}>{error}</small>}
    </div>
  );
};

export default Select;
