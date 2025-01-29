import { string, number, mixed, object } from "yup";

const validationSchemaOptions = (type) => {
  switch (type) {
    case "id":
    case "short_text":
    case "long_text":
      return string().required("Field is required");
    case "number":
    case "boolean":
      return number().required("Field is required");
    default:
      return mixed().required("Field is required");
  }
};

const validationSchema = (fields) => {
  let schema = {};

  fields.forEach((field) => {
    if (field.required) {
      schema[field.slug] = validationSchemaOptions(field?.type);
    }
  });

  return object().shape(schema);
};

export default validationSchema;
