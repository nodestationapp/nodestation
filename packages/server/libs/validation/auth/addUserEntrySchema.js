import { fs } from "@nstation/utils";
import { object, string, mixed, number } from "yup";

const validationSchemaOptions = (type) => {
  switch (type) {
    case "id":
    case "text":
    case "long_text":
    case "select":
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

let addUserEntrySchema = () => {
  const allSchemas = fs.getFiles();
  const schemaFields = allSchemas?.find(
    (item) => item?.id?.toString() === "auth"
  );

  const formattedSchema = schemaFields?.fields?.filter(
    (item) => item?.slug !== "id" && item?.slug !== "created_at"
  );

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

export default addUserEntrySchema;
