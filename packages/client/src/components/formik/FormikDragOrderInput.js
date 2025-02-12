import { useField } from "formik";
import DragOrderInput from "components/form/DragOrderInput";

const FormikDragOrderInput = ({ type, name, ...rest }) => {
  const [field, meta] = useField({ name, type });
  return <DragOrderInput {...rest} {...field} {...meta} />;
};

export default FormikDragOrderInput;
