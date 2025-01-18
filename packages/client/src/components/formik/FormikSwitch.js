import { useField } from "formik";
import Switch from "components/form/Switch";

const FormikSwitch = ({ name, label, ...rest }) => {
  const [field, meta] = useField({ name, type: "checkbox" });
  return <Switch label={label} {...rest} {...field} {...meta} />;
};

export default FormikSwitch;
