import { object, string, array, number } from "yup";

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
      data: array().of(
        object({
          id: string().meta({
            example: "343182",
          }),
          name: string().meta({
            example: "Welcome Email",
          }),
          subject: string().meta({
            example: "Welcome New User",
          }),
          content: string().meta({
            example:
              "Hello {{first_name}},<br/><br/>\\n\\nWelcome to our platform!<br/>\\nWe're excited to have you on board.<br/><br/>\\n\\nBest regards,\\nThe Team",
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
      description: "Email templates retrieved successfully",
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
  description: "Get a table by id",
});
