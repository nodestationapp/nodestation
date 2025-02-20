import moment from "moment";
import { useField } from "formik";

import Input from "components/form/Input";

const FormikDateTime = ({ type, name, ...rest }) => {
  const [field, meta] = useField({ name, type });

  const value = !!field?.value
    ? moment?.unix(field?.value)?.format("YYYY-MM-DDTHH:mm")
    : null;

  const onChange = (e) => {
    const date = moment(e?.target?.value, "YYYY-MM-DDTHH:mm")?.unix();

    field.onChange({
      target: { name, value: date },
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
