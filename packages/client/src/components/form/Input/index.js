import "./styles.scss";

import classnames from "classnames";

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
  uppercaseLabel = false,
  maxLength,
  required,
  id,
  variant,
  aside,
  size,
  onKeyDown,
  autoFocus,
}) => {
  const is_error = touched && error !== undefined;

  return (
    <div
      id={id}
      className={classnames(mainClass, {
        [`${mainClass}--error`]: !!is_error,
        [`${mainClass}--uppercase-label`]: !!uppercaseLabel,
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
            maxLength={maxLength}
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
