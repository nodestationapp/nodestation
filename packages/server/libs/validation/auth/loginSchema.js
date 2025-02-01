import { object, string } from "yup";

let loginSchema = object({
  body: object({
    email: string()
      .required("Field is required.")
      .email("The email is not a valid email address."),
    password: string().required("Field is required."),
  }),
});

export default loginSchema;
