import { object, string, array, boolean, number } from "yup";

export default object({
  params: object({
    id: string().required("Field is required.").meta({
      format: "uuid",
      example: "123e4567-e89b-12d3-a456-426614174000",
      description: "Preferences ID",
    }),
  }),
  body: object({
    name: string().meta({
      example: "Active",
      description: "Preferences name",
    }),
    sort: array().of(
      object({
        field: string().meta({
          example: "name",
          description: "Field name",
        }),
        sort: string().meta({
          example: "asc",
          description: "Sort direction",
          pattern: "^(asc|desc)$",
        }),
      })
    ),
    filters: array().of(
      object({
        field: string().meta({
          example: "status",
          description: "Field name",
        }),
        operator: string().meta({
          example: "is",
          description: "Operator",
          pattern:
            "^(is|is_not|contains|not_contains|starts_with|ends_with|greater_than|less_than|between|in|not_in|equals|not_equals)$",
        }),
        value: string().meta({
          example: "active",
          description: "Value",
        }),
      })
    ),
    content: object({
      id: number().meta({
        example: 160,
        description: "Id size column",
      }),
      name: number().meta({
        example: 190,
        description: "Name size column",
      }),
      created_at: number().meta({
        example: 130,
        description: "Created at size column",
      }),
    }).meta({
      description: "Column sizes for table content",
    }),
    visibility: object({
      id: boolean().meta({
        example: true,
        description: "Id visibility",
      }),
      name: boolean().meta({
        example: true,
        description: "Name visibility",
      }),
      created_at: boolean().meta({
        example: true,
        description: "Created at visibility",
      }),
    }).meta({
      description: "Column visibility for table content",
    }),
  }),
  response: object({
    200: object({
      status: string().meta({
        example: "ok",
      }),
    }).meta({
      description: "Preferences updated successfully",
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
  summary: "Update table preferences",
  description: "Update preferences for the current table",
});
