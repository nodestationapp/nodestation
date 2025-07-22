import { object, string } from "yup";

export default object({
  body: object({
    table_id: string().required("Field is required.").meta({
      example: "projects",
      description: "Table ID",
    }),
    name: string().required("Field is required.").meta({
      example: "Active",
    }),
  }),
  response: object({
    200: object({
      id: string().meta({
        example: "123e4567-e89b-12d3-a456-426614174000",
      }),
    }).meta({
      description: "Preferences created successfully",
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
  summary: "Create table preferences",
  description: "Create preferences for the current table",
});
