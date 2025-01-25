import { useField } from "formik";
import IdInput from "components/form/IdInput";

const FormikIdInput = ({ type, name, ...rest }) => {
  const [field, meta] = useField({ name, type });
  return <IdInput type={type} {...rest} {...field} {...meta} />;
};

export default FormikIdInput;
