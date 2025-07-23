import { object, string } from "yup";

let loginSchema = object({
  body: object({
    email_verification_template: string().meta({
      example: "email_verification_template",
    }),
    forget_password_template: string().meta({
      example: "forget_password_template",
    }),
  }),
  response: object({
    200: object({
      status: string().meta({
        example: "ok",
      }),
    }).meta({
      description: "Templates updated successfully",
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
  summary: "Update templates",
  description: "Update templates for email verification and forget password",
});

export default loginSchema;
