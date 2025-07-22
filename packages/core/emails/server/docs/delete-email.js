import { object, string } from "yup";

let loginSchema = object({
  params: object({
    id: string().required("Field is required.").meta({
      example: "343182",
      description: "Email template ID",
    }),
  }),
  response: object({
    200: object({
      status: string().meta({
        example: "ok",
      }),
    }).meta({
      description: "Email template deleted successfully",
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
  summary: "Delete email template",
  description: "Delete an existing email template",
});

export default loginSchema;
