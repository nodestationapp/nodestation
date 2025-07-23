import { object, string } from "yup";

export default object({
  params: object({
    id: string().meta({
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
  }),
  body: object({
    first_name: string().meta({
      example: "John",
    }),
    last_name: string().meta({
      example: "Doe",
    }),
  }),
  response: object({
    200: object({
      status: string().meta({
        example: "ok",
      }),
    }).meta({
      description: "Table entry created successfully",
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
  summary: "Add table entry",
  description: "Add a table entry with data",
});
