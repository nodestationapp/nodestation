import { useField } from "formik";
import UuidInput from "components/form/UuidInput";

const FormikUuidInput = ({ type, name, ...rest }) => {
  const [field, meta] = useField({ name, type });
  return <UuidInput type={type} {...rest} {...field} {...meta} />;
};

export default FormikUuidInput;
