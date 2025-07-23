import { object, string } from "yup";

export default object({
  body: object({
    password: string().required("Field is required.").meta({
      example: "********",
    }),
    token: string().required("Field is required.").meta({
      example: "373b76f6-66f9-4731-ad71-bfbafd988a8a",
    }),
  }),
  response: object({
    200: object({
      status: string().meta({
        example: "ok",
      }),
    }).meta({
      description: "Reset password successful",
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
  description: "Reset password with token",
});
