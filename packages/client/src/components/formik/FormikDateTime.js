import moment from "moment";
import { useField } from "formik";

import Input from "components/form/Input";

const FormikDateTime = ({ type, name, ...rest }) => {
  const [field, meta] = useField({ name, type });

  const value = !!field?.value
    ? moment?.unix(field?.value)?.format("YYYY-MM-DDTHH:mm")
    : null;

  const onChange = (e) => {
    field.onChange({
      target: { name, value: moment(e?.target?.value).valueOf() },
    });
  };

  return (
    <Input
      type={type}
      {...rest}
      {...field}
      {...meta}
      value={value}
      onChange={onChange}
    />
  );
};

export default FormikDateTime;
