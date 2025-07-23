import { object, string } from "yup";

let loginSchema = object({
  response: object({
    200: object({
      status: string().meta({
        example: "ok",
      }),
    }).meta({
      description: "Email settings updated successfully",
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
  summary: "Update email settings",
  description: "Update email settings with new settings",
});

export default loginSchema;
