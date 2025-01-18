import "./styles.scss";

import classnames from "classnames";
import { useFormikContext } from "formik";

import MethodSelect from "components/MethodSelect";

const mainClass = "title-input";

const TitleInput = ({ label, name, type, placeholder }) => {
  const { values, setFieldValue } = useFormikContext();

  const onChangeHandler = (value) => {
    let current_value = value;

    if (type !== "method") {
      setFieldValue(name, current_value);
      return;
    }

    const index = current_value.indexOf("/");
    if (index !== -1) {
      current_value =
        current_value.slice(0, index) + current_value.slice(index + 1);
    }

    setFieldValue("name", `/${current_value}`);
  };

  return (
    <div
      className={classnames(mainClass, {
        [`${mainClass}--method`]: type === "method",
      })}
    >
      {type === "method" && (
        <MethodSelect
          method={values?.options?.method}
          onChange={(value) => setFieldValue("options.method", value)}
        />
      )}
      {!!label && <label>{label}</label>}
      <input
        type="text"
        value={values?.[name]}
        placeholder={placeholder}
        onChange={(e) => onChangeHandler(e.target.value)}
      />
    </div>
  );
};

export default TitleInput;
