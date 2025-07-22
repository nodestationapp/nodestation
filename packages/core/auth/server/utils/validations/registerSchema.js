import { object, string } from "yup";

let registerSchema = object({
  body: object({
    first_name: string().required("First name cannot be empty.").meta({
      example: "John",
    }),
    last_name: string().required("Last name cannot be empty.").meta({
      example: "Doe",
    }),
    email: string()
      .required("Email cannot be empty.")
      .email("The email is not a valid email address.")
      .meta({
        example: "john.doe@example.com",
      }),
    password: string()
      .required("Password cannot be empty.")
      .min(10, "Password must be at least 10 characters.")
      .matches(/[0-9]/, "Password must have at least one number.")
      .matches(/[A-Z]/, "Password must have one upper case letter.")
      .matches(/[a-z]/, "Password must have one lower case letter.")
      .meta({
        example: "qwerty",
      }),
  }),
  response: object({
    200: object({
      status: string().meta({
        example: "ok",
      }),
    }),
    500: object({
      error: string().meta({
        example: "Something went wrong",
      }),
    }),
  }),
}).meta({
  tags: ["Authentication"],
  summary: "Register a new user",
  description: "Register a new user with the given email and password.",
});

export default registerSchema;
