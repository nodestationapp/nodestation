import { object, string } from "yup";

let resetPasswordSchema = object({
  email: string()
    .required("Email cannot be empty.")
    .email("The email is not a valid email address."),
});

export default resetPasswordSchema;
