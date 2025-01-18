import { useField } from "formik";
import Input from "components/form/Input";

const FormikInput = ({ type, name, ...rest }) => {
  const [field, meta] = useField({ name, type });
  return <Input type={type} {...rest} {...field} {...meta} />;
};

export default FormikInput;
