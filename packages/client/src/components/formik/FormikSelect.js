import { useField } from "formik";
import Select from "components/form/Select";

const FormikSelect = ({ type, name, ...rest }) => {
  const [field, meta] = useField({ name, type });
  return <Select {...rest} {...field} {...meta} />;
};

export default FormikSelect;
