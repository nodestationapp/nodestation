import { useField } from "formik";
import RefTable from "components/form/RefTable";

const FormikRefTable = ({ type, name, ...rest }) => {
  const [field, meta] = useField({ name, type });

  return <RefTable {...rest} {...field} {...meta} />;
};

export default FormikRefTable;
