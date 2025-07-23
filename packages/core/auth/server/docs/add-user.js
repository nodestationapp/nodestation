import { object, string } from "yup";

let loginSchema = object({
  body: object({
    first_name: string().required("Field is required.").meta({
      example: "John",
    }),
    last_name: string().required("Field is required.").meta({
      example: "Doe",
    }),
    email: string().required("Field is required.").meta({
      format: "email",
      example: "john.doe@example.com",
    }),
    password: string().required("Field is required.").meta({
      example: "password123",
    }),
    status: string()
      .required("Field is required.")
      .meta({
        enum: ["active", "inactive"],
        example: "active",
      }),
    type: string()
      .required("Field is required.")
      .meta({
        enum: ["superadmin", "admin", "client"],
        example: "admin",
      }),
  }),
  response: object({
    200: object({
      status: string().meta({
        example: "ok",
      }),
    }).meta({
      description: "User created successfully",
    }),
    500: object({
      error: string().meta({
        example: "Something went wrong",
      }),
    }).meta({
      description: "Something went wrong",
    }),
  }),
}).meta({
  tags: ["Authentication"],
  summary: "Add new user",
  description: "Create a new user account",
});

export default loginSchema;
