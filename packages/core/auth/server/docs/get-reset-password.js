import { object, string } from "yup";

export default object({
  query: object({
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
      description: "Reset password token is valid",
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
  summary: "Check reset password token",
  description: "Check if reset password token is valid",
});
