import { number, object, string } from "yup";

export default object({
  body: object({
    key: string().required("Field is required.").meta({
      example: "errors_notification",
    }),
    body: object({
      send_to: string().meta({
        example: "john.doe@example.com",
      }),
    }).required("Field is required."),
    active: number().meta({
      example: 1,
      pattern: "1|0",
    }),
  }),
  response: object({
    200: object({
      status: string().meta({
        example: "ok",
      }),
    }).meta({
      description: "Settings updated successfully",
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
  summary: "Update logs settings",
  description: "Update logs settings by key",
});
