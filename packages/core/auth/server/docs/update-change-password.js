import { object, string } from "yup";

export default object({
  body: object({
    current_password: string().required("Field is required.").meta({
      example: "********",
    }),
    new_password: string().required("Field is required.").meta({
      example: "********",
    }),
  }),
  response: object({
    200: object({
      status: string().meta({
        example: "ok",
      }),
    }).meta({
      description: "Password changed successfully",
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
  summary: "Change user password",
  description: "Change current user's password",
});
