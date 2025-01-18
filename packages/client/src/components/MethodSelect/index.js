import "./styles.scss";

import classnames from "classnames";
import { useState, useRef } from "react";

import methods_data from "libs/methods_data.json";
import useClickOutside from "libs/helpers/useClickOutside";

import { ChevronDownIcon } from "@heroicons/react/24/outline";

const mainClass = "method-select";

const MethodSelect = ({ method, read_only, onChange, size, variant }) => {
  const ref = useRef();
  const [is_open, setIsOpen] = useState(false);

  useClickOutside(ref, () => {
    setIsOpen(false);
  });

  const onChangeHandler = (value) => {
    setIsOpen(false);
    onChange(value);
  };

  const selected_method = methods_data?.find((item) => item?.label === method);

  return (
    <div
      ref={ref}
      className={classnames(`${mainClass}`, `${mainClass}--${method}`, {
        [`${mainClass}--read-only`]: !!read_only,
        [`${mainClass}--${size}`]: !!size,
        [`${mainClass}--${variant}`]: !!variant,
      })}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{ backgroundColor: selected_method?.color }}
      >
        <span>{method}</span>
        {!!!read_only && <ChevronDownIcon />}
      </button>
      {!!is_open && (
        <div className={`${mainClass}__list`}>
          {methods_data?.map(({ label, color }, index) => (
            <button
              key={index}
              type="button"
              style={{ backgroundColor: color }}
              onClick={() => onChangeHandler(label)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MethodSelect;
