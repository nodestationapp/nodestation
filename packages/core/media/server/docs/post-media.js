import { object, string, mixed } from "yup";

export default object({
  body: object({
    files: mixed().required("Field is required.").meta({
      example: "https://example.com/image.png",
    }),
  }),
  response: object({
    200: object({
      status: string().meta({
        example: "ok",
      }),
    }).meta({
      description: "Media uploaded successfully",
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
  summary: "Upload media",
  description: "Upload media",
  type: "multipart/form-data",
});
