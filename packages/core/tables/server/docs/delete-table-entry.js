import { object, string } from "yup";

export default object({
  params: object({
    id: string().meta({
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    entry_id: string().meta({
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
  }),
  response: object({
    200: object({
      status: string().meta({
        example: "ok",
      }),
    }).meta({
      description: "Table entry deleted successfully",
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
  tags: ["Tables"],
  summary: "Delete table entry",
  description: "Delete a table entry by id",
});
