import { useField } from "formik";
import Textarea from "components/form/Textarea";

const FormikTextarea = ({ type, name, ...rest }) => {
  const [field, meta] = useField({ name, type });
  return <Textarea type={type} {...rest} {...field} {...meta} />;
};

export default FormikTextarea;
