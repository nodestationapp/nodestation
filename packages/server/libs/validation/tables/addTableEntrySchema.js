import { fs } from "@nstation/utils";
import { object, string, mixed, number } from "yup";

const validationSchemaOptions = (type) => {
  switch (type) {
    case "id":
    case "text":
      return string().required("Field is required");
    case "number":
    case "boolean":
      return number()
        .required("Field is required")
        .typeError("Field is required");
    case "media":
      return object()
        .required("Field is required")
        .typeError("Field is required");
    default:
      return mixed().required("Field is required");
  }
};

let addTableEntrySchema = (data) => {
  let schemaFields = fs.getSchema(data?.params?.id);
  schemaFields = schemaFields?.fields;

  const formattedSchema = schemaFields?.filter((item) => item?.slug !== "id");

  let schema = {};

  formattedSchema.forEach((field) => {
    if (field.required) {
      schema[field.slug] = validationSchemaOptions(field?.type);
    }
  });

  return object({
    body: object({
      ...schema,
    }),
  });
};

export default addTableEntrySchema;
