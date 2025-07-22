import { object, string } from "yup";

export default object({
  params: object({
    id: string().required("Field is required.").meta({
      format: "uuid",
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
  }),
  response: object({
    200: object({
      status: string().meta({
        example: "ok",
      }),
    }).meta({
      description: "Preferences deleted successfully",
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
  summary: "Delete table preferences",
  description: "Delete preferences for the current table",
});
