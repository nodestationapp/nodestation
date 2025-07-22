import { object, string } from "yup";

export default object({
  response: object({
    200: object({}).meta({
      description: "Preferences retrieved successfully",
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
  tags: ["Preferences"],
  summary: "Get table preferences",
  description: "Get preferences for the current table",
});
