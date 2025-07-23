import { array, number, object, string } from "yup";

export default object({
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
            example: "2ca48b43-2887-48fd-8c09-88b0053472f5",
            description: "ID of the media",
          }),
          name: string().meta({
            example: "image.png",
            description: "Name of the media",
          }),
          size: number().meta({
            example: 81902,
            description: "Size in bytes",
          }),
          type: string().meta({
            example: "image/png",
            description: "Type of the media",
          }),
          url: string().meta({
            example: "https://example.com/image.png",
            description: "URL of the media",
          }),
          created_at: number().meta({
            example: 1751028247,
            description: "Timestamp of the media creation",
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
      description: "Media retrieved successfully",
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
  summary: "Get all media",
  description: "Get all media with pagination and sorting",
});
