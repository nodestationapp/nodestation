import { object, string, array } from "yup";

export default object({
  response: object({
    200: object({
      items: array().of(
        object({
          id: string().meta({
            example: "123e4567-e89b-12d3-a456-426614174000",
          }),
        })
      ),
      description: "Tables retrieved successfully",
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
  summary: "Get tables",
  description: "Get all tables",
});
