import "./styles.scss";

import classnames from "classnames";

const mainClass = "uuid-input";

const UuidInput = ({
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
}) => {
  const is_error = touched && error !== undefined;

  return (
    <div
      id={id}
      className={classnames(mainClass, {
        [`${mainClass}--error`]: !!is_error,
        [`${mainClass}--uppercase-label`]: !!uppercaseLabel,
        [`${mainClass}--${variant}`]: !!variant,
      })}
    >
      {!!label && (
        <label>
          {label}
          {!!required && <span>*</span>}
        </label>
      )}
      <div className={`${mainClass}__content`}>
        <span>UUID</span>
        <input
          className={`${mainClass}__field`}
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          disabled={disabled}
          maxLength={maxLength}
        />
      </div>
      {!!is_error && <small className={`${mainClass}__error`}>{error}</small>}
    </div>
  );
};

export default UuidInput;
