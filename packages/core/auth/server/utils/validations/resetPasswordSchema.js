import { object, string } from "yup";

const resetPasswordSchema = object({
  body: object({
    email: string()
      .required("Field is required.")
      .email("The email is not a valid email address."),
  }),
});

export default resetPasswordSchema;
