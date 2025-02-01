import { object, string } from "yup";

let emailSchema = object({
  email: string()
    .required("Field is required.")
    .email("The email is not a valid email address."),
});

export default emailSchema;
