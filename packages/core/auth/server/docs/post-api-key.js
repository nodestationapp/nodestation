import { object, string } from "yup";

export default object({
  body: object({
    name: string().required("Field is required.").meta({
      example: "My app",
    }),
    expiration: string().required("Field is required.").meta({
      example: "unlimited",
    }),
  }),
  response: object({
    200: object({
      access_token: string().meta({
        format: "string",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      }),
    }).meta({
      description: "Api key created successfully",
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
  summary: "Create api key",
  description: "Create new api key",
});
