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
      description: "Media deleted successfully",
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
  summary: "Delete media",
  description: "Delete media",
});
