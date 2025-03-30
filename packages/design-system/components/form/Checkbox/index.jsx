import "./styles.scss";

import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const mainClass = "checkbox";

const Checkbox = ({
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
          onClick={onClick}
          onChange={onChange}
          disabled={disabled}
          checked={checked}
        />
        <span className="checkmark" />
      </label>
    </div>
  );
};

export default Checkbox;

Checkbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  touched: PropTypes.bool,
  error: PropTypes.string,
};