import "./styles.scss";

import PropTypes from "prop-types";
import classnames from "classnames";

const mainClass = "textarea";

const Textarea = ({
  label,
  placeholder,
  name,
  touched,
  error,
  value,
  onChange,
  disabled,
  required,
}) => {
  const is_error = touched && error !== undefined;

  return (
    <div
      className={classnames(mainClass, {
        [`${mainClass}--error`]: !!is_error,
        [`${mainClass}--filled`]: !!value,
      })}
    >
      {!!label && (
        <label>
          {label}
          {!!required && <span>*</span>}
        </label>
      )}
      <div className={`${mainClass}__content`}>
        <textarea
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          disabled={disabled}
        ></textarea>
      </div>
      {!!is_error && <small className={`${mainClass}__error`}>{error}</small>}
    </div>
  );
};

export default Textarea;

Textarea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  touched: PropTypes.bool,
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};
