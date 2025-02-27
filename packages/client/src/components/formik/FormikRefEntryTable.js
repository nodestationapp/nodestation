import { useField } from "formik";
import RefEntryTable from "components/form/RefEntryTable";

const FormikRefEntryTable = ({ type, name, ...rest }) => {
  const [field, meta] = useField({ name, type });

  return <RefEntryTable {...rest} {...field} {...meta} size="small" />;
};

export default FormikRefEntryTable;
