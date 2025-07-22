import { object, string } from "yup";

export default object({
  body: object({
    email: string()
      .required("Field is required.")
      .email("The email is not a valid email address.")
      .meta({
        format: "email",
        example: "john.doe@example.com",
      }),
  }),
  response: object({
    200: object({
      status: string().meta({
        example: "ok",
      }),
    }).meta({
      description: "Password reset email sent successfully",
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
  summary: "Reset password",
  description: "Send password reset email to user",
});
