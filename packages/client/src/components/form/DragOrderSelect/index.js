import "./styles.scss";

import classnames from "classnames";
import { useState, useRef } from "react";

import Select from "../Select";
import TransparentButton from "components/TransparentButton";
import DragOrderSelectContent from "./components/DragOrderSelectContent";

import useOnScreen from "libs/helpers/useOnScreen";
import useClickOutside from "libs/helpers/useClickOutside";

import { PlusIcon } from "@heroicons/react/24/outline";

const mainClass = "drag-order-select";

const DragOrderSelect = ({
  label,
  options = [],
  placeholder,
  required,
  selected,
  onChange,
  disabled,
  value = [],
  touched,
  error,
  hideError,
  id,
  variant,
  CustomButton,
  itemAction,
  actionAlwaysVisible,
}) => {
  const is_error = !!!hideError && touched && !!error;

  const [select_open, setSelectOpen] = useState(false);

  const ref = useRef();
  const button_ref = useRef();

  useClickOutside(ref, () => {
    setSelectOpen(false);
  });

  const can_bottom = useOnScreen(button_ref);

  const appendMiddleware = (item) => {
    let temp = [...value];

    temp.push(item);
    onChange({ target: { value: temp } });
  };

  // const removeMiddleware = (item) => {
  //   let temp = [...value];

  //   const index = temp?.findIndex((element) => element === item);

  //   temp.splice(index, 1);

  //   onChange({ target: { value: temp } });
  // };

  const formatted_value = value?.map((item) => ({
    disabled: options?.find((element) => element?.value === item)?.disabled,
    label: options?.find((element) => element?.value === item)?.label,
    value: item,
  }));

  const formatted_options = options?.filter(
    (item) => !value?.includes(item?.value)
  );

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
        [`${mainClass}--empty`]: !!!value,
        [`${mainClass}--filled`]: !!value,
        [`${mainClass}--custom-button`]: !!CustomButton,
        [`${mainClass}--${variant}`]: !!variant,
        [`${mainClass}--action-visible`]: !!actionAlwaysVisible,
      })}
    >
      {!!label && (
        <label>
          {label}
          {!!required && <span>*</span>}
        </label>
      )}
      {/* <CustomButton /> */}
      <button
        ref={button_ref}
        type="button"
        onClick={() => setSelectOpen((prev) => !prev)}
      >
        {CustomButton ? (
          <CustomButton active={!!select_open} />
        ) : (
          <span>
            {value
              ?.map(
                (item) =>
                  options?.find((element) => element?.value === item)?.label
              )
              ?.join(", ") || placeholder}
          </span>
        )}
      </button>
      {select_open && (
        <div
          className={classnames(`${mainClass}__options`, {
            [`${mainClass}__options--empty`]: !!!value?.length,
          })}
        >
          <div className={`${mainClass}__options__wrapper`}>
            <DragOrderSelectContent
              value={value}
              onChange={onChange}
              data={formatted_value}
              itemAction={itemAction}
              actionAlwaysVisible={actionAlwaysVisible}
            />
          </div>
          {value?.length !== options?.length && (
            <div className={`${mainClass}__options__bottom`}>
              <Select
                onChange={({ target }) => appendMiddleware(target?.value)}
                options={formatted_options?.map((item) => ({
                  label: item?.label,
                  value: item?.value,
                }))}
                CustomButton={() => (
                  <TransparentButton
                    label="Add middleware"
                    icon={<PlusIcon />}
                    variant="transparent"
                  />
                )}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DragOrderSelect;
