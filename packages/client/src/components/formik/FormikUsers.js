import { useField } from "formik";
import UsersInput from "components/form/Users";

const FormikUsers = ({ type, name, ...rest }) => {
  const [field, meta] = useField({ name, type });

  return <UsersInput {...rest} {...field} {...meta} />;
};

export default FormikUsers;
