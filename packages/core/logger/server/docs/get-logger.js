import { object, string, number, array, boolean } from "yup";

let loginSchema = object({
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
      items: array().of(
        object({
          id: string().meta({
            example: "343182",
          }),
          level: string().meta({
            example: "info",
          }),
          is_read: boolean().meta({
            example: true,
          }),
          source: string().meta({
            example: "addon-cron",
          }),
          message: string().meta({
            example: "This is a test message",
          }),
          created_at: number().meta({
            example: 1752238980,
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
      description: "Logs retrieved successfully",
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
  tags: ["Logs"],
  summary: "Get logs",
  description: "Get logs with pagination and sorting",
});

export default loginSchema;
