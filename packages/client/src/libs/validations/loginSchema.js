import { object, string } from "yup";

let loginSchema = object({
  email: string()
    .required("Email cannot be empty.")
    .email("The email is not a valid email address."),
  password: string().required("Password cannot be empty."),
});

export default loginSchema;
