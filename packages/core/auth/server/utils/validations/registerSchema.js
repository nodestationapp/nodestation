import { object, string } from "yup";

let registerSchema = object({
  body: object({
    first_name: string().required("First name cannot be empty."),
    last_name: string().required("Last name cannot be empty."),
    email: string()
      .required("Email cannot be empty.")
      .email("The email is not a valid email address."),
    password: string()
      .required("Password cannot be empty.")
      .min(10, "Password must be at least 10 characters.")
      .matches(/[0-9]/, "Password must have at least one number.")
      .matches(/[A-Z]/, "Password must have one upper case letter.")
      .matches(/[a-z]/, "Password must have one lower case letter."),
  }),
});

export default registerSchema;
