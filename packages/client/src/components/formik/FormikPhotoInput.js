import { useField } from "formik";
import PhotoInput from "components/form/PhotoInput";

const FormikPhotoInput = ({ type, name, ...rest }) => {
  const [field, meta] = useField({ name, type });
  return <PhotoInput type={type} {...rest} {...field} {...meta} />;
};

export default FormikPhotoInput;
