import { object, string } from "yup";

export default object({
  body: object({
    name: string().required("Field is required.").meta({
      example: "Welcome Email",
    }),
    subject: string().meta({
      example: "Welcome New User",
    }),
    content: string().meta({
      example:
        "Hello {{first_name}},<br/><br/>\\n\\nWelcome to our platform!<br/>\\nWe're excited to have you on board.<br/><br/>\\n\\nBest regards,\\nThe Team",
    }),
  }),
  response: object({
    200: object({
      status: string().meta({
        example: "ok",
      }),
    }).meta({
      description: "Email template created successfully",
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
  tags: ["Emails"],
  summary: "Create email template",
  description: "Create a new email template",
});
