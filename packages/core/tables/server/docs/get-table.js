import { object, string, array, number, boolean } from "yup";

export default object({
  params: object({
    id: string().meta({
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
  }),
  query: object({
    page: number().meta({
      example: 0,
      minimum: 0,
    }),
    pageSize: number().meta({
      example: 20,
      minimum: 1,
      maximum: 1000,
    }),
    sort: string().meta({
      example: "created_at:asc",
      pattern: "^[a-zA-Z_]+:(asc|desc)$",
    }),
  }),
  response: object({
    200: object({
      table: object({
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
      }),
      entries: array().of(
        object({
          id: string().meta({
            example: "81b1aae5-4a40-495c-a1ac-e6b9b00ecef7",
          }),
        })
      ),
      meta: object({
        page: number().meta({
          example: 0,
        }),
        pageSize: number().meta({
          example: 20,
        }),
        count: number().meta({
          example: 100,
        }),
      }),
    }).meta({
      description: "Table retrieved successfully",
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
  summary: "Get table",
  description: "Get a table by id with pagination and sorting",
});
