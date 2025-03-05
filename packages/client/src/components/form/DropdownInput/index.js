import "./styles.scss";

import classnames from "classnames";
import { useState, useRef } from "react";

import Button from "components/Button";

import useOnScreen from "libs/helpers/useOnScreen";
import useClickOutside from "libs/helpers/useClickOutside";

import { ChevronDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import IconButton from "components/IconButton";

const mainClass = "dropdown-input";

const DropdownInput = ({
  name,
  label,
  placeholder,
  required,
  selected,
  onChange,
  disabled,
  value,
  id,
  variant,
  noArrow,
  validate,
  CustomButton,
  position,
  preventSelectOpen,
  onDelete,
}) => {
  const [input_value, setInputValue] = useState(value);
  const [error, setError] = useState(false);

  const [select_open, setSelectOpen] = useState(false);

  const ref = useRef();
  const button_ref = useRef();

  useClickOutside(ref, () => {
    setSelectOpen(false);
  });

  const can_bottom = useOnScreen(button_ref);

  const onChangeHandler = () => {
    setError(false);

    const isValid = !!validate
      ? validate(input_value, { seconds: true })
      : true;

    if (!!!isValid) {
      setError(true);
      return null;
    }

    onChange({ target: { name, value: input_value } });
    setInputValue("");
    setSelectOpen(false);
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
        [`${mainClass}--error`]: !!error,
        [`${mainClass}--empty`]: !!!value,
        [`${mainClass}--filled`]: !!value,
        [`${mainClass}--${position}`]: !!position,
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
          onClick={
            !!preventSelectOpen
              ? () => {}
              : () => setSelectOpen((prev) => !prev)
          }
        >
          <CustomButton active={select_open} />
        </div>
      ) : (
        <button
          ref={button_ref}
          type="button"
          onClick={() => setSelectOpen((prev) => !prev)}
        >
          <span>{value || placeholder}</span>
          {!!!noArrow && <ChevronDownIcon />}
        </button>
      )}
      {select_open && (
        <div className={`${mainClass}__content`}>
          <div className={`${mainClass}__content__input`}>
            <input
              value={input_value}
              placeholder={placeholder || "Type expression..."}
              onChange={(e) => setInputValue(e.target.value)}
            />
            {!!onDelete && (
              <IconButton
                onClick={onDelete}
                size="small"
                icon={<TrashIcon />}
              />
            )}
          </div>
          <Button size="small" onClick={onChangeHandler}>
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default DropdownInput;
