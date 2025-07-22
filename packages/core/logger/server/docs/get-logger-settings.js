import { object, string, array, number } from "yup";

export default object({
  response: object({
    200: object({
      items: array().of(
        object({
          id: string().meta({
            example: "e9c30369-61d9-428f-8a74-222ef7f5d76d",
            description: "Logger setting ID",
          }),
          key: string().meta({
            example: "errors_notification",
            description: "Logger setting key",
          }),
          active: string().meta({
            example: 0,
            description: "Logger setting active",
          }),
          body: string().meta({
            example: `"{\"send_to\":\"ceo@nodestation.app\"}"`,
            description: "Logger setting body",
          }),
          created_at: number().meta({
            example: 1752238980,
          }),
        })
      ),
    }).meta({
      description: "Logger settings retrieved successfully",
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
  summary: "Get logs settings",
  description: "Get default and custom logs settings",
});
