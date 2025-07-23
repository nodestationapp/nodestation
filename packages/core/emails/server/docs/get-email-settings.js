import { object, string } from "yup";

let loginSchema = object({
  response: object({
    200: object({
      id: string().meta({
        format: "uuid",
        example: "2ca48b43-2887-48fd-8c09-88b0053472f5",
      }),
    }).meta({
      description: "Email settings retrieved successfully",
    }),
    500: object({
      error: string().meta({
        format: "string",
        example: "Something went wrong",
      }),
    }).meta({
      description: "Invalid credentials or validation error",
    }),
  }),
}).meta({
  tags: ["Emails"],
  summary: "Get email settings",
  description: "Get email settings",
});

export default loginSchema;
