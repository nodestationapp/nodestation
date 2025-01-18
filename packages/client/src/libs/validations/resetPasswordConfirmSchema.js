import { object, string, ref } from "yup";

let resetPasswordConfirmSchema = object({
  password: string().required("Password cannot be empty."),
  password2: string()
    .required("Repeat password cannot be empty.")
    .oneOf([ref("password"), null], "Passwords must be the same."),
});

export default resetPasswordConfirmSchema;
