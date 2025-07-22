import { object, string } from "yup";

export default object({
  response: object({
    200: object({}).meta({
      description: "Media retrieved successfully",
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
  tags: ["Media"],
  summary: "Get all media",
  description: "Get all media",
});
