import "./styles.scss";
// import "react-perfect-scrollbar/dist/css/styles.css";

import PropTypes from "prop-types";
import classnames from "classnames";
import { useState, useRef } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

import useOnScreen from "../../../helpers/useOnScreen";
import useClickOutside from "../../../helpers/useClickOutside";

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
  noArrow,
  multi,
  CustomButton,
  CustomValue,
}) => {
  const is_error = !!!hideError && touched && !!error;

  const [select_open, setSelectOpen] = useState(false);

  const ref = useRef();
  const button_ref = useRef();

  useClickOutside(ref, () => {
    setSelectOpen(false);
  });

  const can_bottom = useOnScreen(button_ref);
  const current_value = !!value
    ? !!multi
      ? options?.filter((item) => value?.includes(item?.value))
      : [options?.find((item) => item?.value === value)]
    : null;

  const onChangeHandler = (item) => {
    if (multi) {
      let temp = [...current_value];

      const index = temp?.findIndex(
        (element) => element?.value === item?.value
      );
      if (index === -1) {
        temp.push(item);
      } else {
        temp.splice(index, 1);
      }

      onChange({ target: { name, value: temp?.map((item) => item?.value) } });
    } else {
      onChange({ target: { name, value: item?.value } });
      setSelectOpen((prev) => !prev);
    }
  };

  return (
    <div
      ref={ref}
      className={classnames(mainClass, {
        [`${mainClass}--active`]: !!select_open,
        [`${mainClass}--selected`]: !!selected,
        [`${mainClass}--top`]: !!!can_bottom,
        [`${mainClass}--disabled`]: !!disabled,
        [`${mainClass}--error`]: !!is_error,
        [`${mainClass}--empty`]: value === null,
        [`${mainClass}--filled`]: value !== null,
        [`${mainClass}--custom-value`]: !!CustomValue,
      })}
    >
      <div className={`${mainClass}__content`}>
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
              {current_value?.[0]?.icon}
              <>
                {CustomValue ? (
                  <>
                    {current_value?.map((item) => (
                      <CustomValue label={item?.label} color={item?.color} />
                    ))}
                  </>
                ) : (
                  current_value?.map((item) => item?.label)?.join(", ") ||
                  placeholder
                )}
              </>
            </span>
            {!!!noArrow && <ChevronDownIcon />}
          </button>
        )}
        {select_open && (
          <div className={`${mainClass}__options`}>
            <PerfectScrollbar
              options={{
                useBothWheelAxes: false,
                suppressScrollX: true,
              }}
            >
              {options?.map((item, index) => (
                <button
                  type="button"
                  key={index}
                  className={classnames(`${mainClass}__options__item`, {
                    [`${mainClass}__options__item--selected`]:
                      selected?.value === item?.value,
                  })}
                  onClick={() =>
                    onChangeHandler({
                      label: item?.value,
                      value: item?.value,
                      color: item?.color,
                    })
                  }
                >
                  {!!CustomValue ? (
                    <>
                      <CustomValue label={item?.label} color={item?.color} />
                    </>
                  ) : (
                    <>
                      {item?.icon}
                      {item?.label}
                    </>
                  )}

                  {current_value?.find(
                    (element) => element?.value === item?.value
                  ) && (
                    <div
                      className={`${mainClass}__options__item__selected-icon`}
                    >
                      <CheckIcon />
                    </div>
                  )}
                </button>
              ))}
            </PerfectScrollbar>
          </div>
        )}
      </div>
      {!!is_error && <small className={`${mainClass}__error`}>{error}</small>}
    </div>
  );
};

export default Select;

Select.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  selected: PropTypes.object,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  touched: PropTypes.bool,
  error: PropTypes.string,
  hideError: PropTypes.bool,
  noArrow: PropTypes.bool,
  multi: PropTypes.bool,
  CustomButton: PropTypes.func,
  CustomValue: PropTypes.func,
};
