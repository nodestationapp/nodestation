import { object, string, array, boolean } from "yup";

export default object({
  response: object({
    200: array()
      .of(
        object({
          id: string().meta({
            example: "users",
          }),
          name: string().meta({
            example: "Users",
          }),
          tableName: string().meta({
            example: "users",
          }),
          displayName: string().meta({
            example: "name",
          }),
          fields: array().of(
            object({
              name: string().meta({
                example: "ID",
              }),
              slug: string().meta({
                example: "id",
              }),
              type: string().meta({
                example: "id",
              }),
              required: boolean().meta({
                example: true,
              }),
              read_only: boolean().meta({
                example: true,
              }),
              origin: string().meta({
                example: "system",
              }),
              primary_key: boolean().meta({
                example: true,
              }),
              default: string().meta({
                example: "generate_id()",
              }),
            })
          ),
        })
      )
      .meta({
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
