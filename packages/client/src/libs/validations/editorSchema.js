import { object, string } from "yup";

let editorSchema = object({
  type: string().required("Type cannot be empty."),
  name: string()
    .required("Name cannot be empty.")
    .when("type", {
      is: "ep",
      then: (schema) =>
        schema.min(2, "Name must be at least 2 characters long."),
      otherwise: (schema) =>
        schema.min(1, "Name must be at least 1 character long."),
    }),
});

export default editorSchema;
