import "./styles.scss";

import classnames from "classnames";
import PropTypes from "prop-types";

const mainClass = "input";

const Input = ({
  type = "text",
  label,
  placeholder,
  name,
  touched,
  error,
  value,
  onChange,
  disabled,
  required,
  variant,
  aside,
  size,
  onKeyDown,
  autoFocus,
}) => {
  const is_error = touched && error !== undefined;

  return (
    <div
      className={classnames(mainClass, {
        [`${mainClass}--error`]: !!is_error,
        [`${mainClass}--${variant}`]: !!variant,
        [`${mainClass}--filled`]: !!value || type === "datetime-local",
        [`${mainClass}--disabled`]: !!disabled,
        [`${mainClass}--${size}`]: !!size,
        [`${mainClass}--is-aside`]: !!aside,
      })}
    >
      <div className={`${mainClass}__content`}>
        {!!label && (
          <label>
            {label}
            {!!required && <span>*</span>}
          </label>
        )}
        <div className={`${mainClass}__content__wrapper`}>
          <input
            className={`${mainClass}__field`}
            type={type}
            disabled={!!disabled}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            onKeyDown={onKeyDown}
            autoFocus={autoFocus}
          />
          <div className={`${mainClass}__aside`}>{aside}</div>
        </div>
      </div>
      {!!is_error && <small className={`${mainClass}__error`}>{error}</small>}
    </div>
  );
};

export default Input;

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  touched: PropTypes.bool,
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  variant: PropTypes.oneOf(["light", "brighter", "transparent"]),
  aside: PropTypes.node,
  size: PropTypes.oneOf(["small", "medium"]),
  onKeyDown: PropTypes.func,
  autoFocus: PropTypes.bool,
};
