import { object, string, array } from "yup";

export default object({
  response: object({
    200: object({
      items: array().of(
        object({
          id: string().meta({
            format: "uuid",
            example: "123e4567-e89b-12d3-a456-426614174000",
          }),
        })
      ),
    }).meta({
      description: "Media settings retrieved successfully",
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
  summary: "Get media settings",
  description: "Get media settings",
});
