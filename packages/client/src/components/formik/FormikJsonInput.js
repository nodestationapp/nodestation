import { useField } from "formik";
import JsonInput from "components/form/JsonInput";

const FormikJsonInput = ({ name, ...rest }) => {
  const [field, meta] = useField({ name });
  return <JsonInput {...rest} {...field} {...meta} />;
};

export default FormikJsonInput;
