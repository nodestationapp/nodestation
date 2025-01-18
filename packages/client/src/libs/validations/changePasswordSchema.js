import { object, string, ref } from "yup";

const changePasswordSchema = object({
  current_password: string().required("Current password cannot be empty."),
  new_password: string()
    .required("Password cannot be empty.")
    .min(10, "Password must be at least 10 characters.")
    .matches(/[0-9]/, "Password must have at least one number.")
    .matches(/[A-Z]/, "Password must have one upper case letter.")
    .matches(/[a-z]/, "Password must have one lower case letter."),
  new_password2: string()
    .required("Repeat password cannot be empty.")
    .oneOf([ref("new_password"), null], "Passwords must be the same."),
});

export default changePasswordSchema;
