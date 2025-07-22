import { object, string } from "yup";

export default object({
  body: object({
    refresh_token: string().required("Field is required.").meta({
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    }),
  }),
  response: object({
    200: object({
      access_token: string().meta({
        format: "string",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      }),
      refresh_token: string().meta({
        format: "string",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      }),
    }).meta({
      description: "Token refreshed successfully",
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
  summary: "Refresh access token",
  description: "Get new access token using refresh token",
});
