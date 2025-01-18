import "./styles.scss";

import React from "react";
import classnames from "classnames";

const mainClass = "switch";

const Switch = ({
  label,
  name,
  checked,
  onChange,
  onClick,
  disabled,
  touched,
  error,
}) => {
  const is_error = touched && !!error;

  return (
    <div
      onClick={onClick}
      className={classnames(mainClass, {
        [`${mainClass}--error`]: is_error,
        [`${mainClass}--no-label`]: !!!label,
        [`${mainClass}--disabled`]: !!disabled,
      })}
    >
      <label>
        {label}
        <input
          type="checkbox"
          name={name}
          onChange={onChange}
          disabled={disabled}
          checked={checked}
        />
        <span className="checkmark" />
      </label>
    </div>
  );
};

export default Switch;
