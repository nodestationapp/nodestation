import { object, string, ref } from "yup";

const resetPasswordConfirmSchema = object({
  body: object({
    password: string()
      .required("Password cannot be empty.")
      .min(10, "Password must be at least 10 characters.")
      .matches(/[0-9]/, "Password must have at least one number.")
      .matches(/[A-Z]/, "Password must have one upper case letter.")
      .matches(/[a-z]/, "Password must have one lower case letter."),
    password2: string()
      .required("Repeat password cannot be empty.")
      .oneOf([ref("password"), null], "Passwords must be the same."),
  }),
});

export default resetPasswordConfirmSchema;
