import { object, string } from "yup";

let loginSchema = object({
  body: object({
    email: string()
      .required("Field is required.")
      .email("The email is not a valid email address.")
      .meta({
        format: "email",
        example: "john.doe@example.com",
      }),
    password: string().required("Field is required.").meta({
      example: "qwerty",
    }),
  }),
  response: object({
    200: object({
      access_token: string().meta({
        format: "string",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      }),
      refresh_token: string().meta({
        format: "string",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      }),
    }).meta({
      description: "Login successful",
    }),
    500: object({
      errors: string().meta({
        format: "string",
        example: "Invalid credentials or validation error",
      }),
    }).meta({
      description: "Invalid credentials or validation error",
    }),
  }),
}).meta({
  tags: ["Authentication"],
  summary: "User login",
  description: "Authenticate user with email and password",
});

export default loginSchema;
