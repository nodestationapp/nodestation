const { object, string, ref } = require("yup");

let registerSchema = object({
  body: object({
    name: string()
      .required("Field is required")
      .email("Email address must be an email address"),
    password: string()
      .min(6, "Password must contain at least 6 characters")
      .required("Password is required"),
    password2: string().oneOf(
      [ref("password"), null],
      "Passwords do not match"
    ),
  }),
});

export default registerSchema;
