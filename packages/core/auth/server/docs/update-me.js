import { object, string } from "yup";

export default object({
  body: object({
    first_name: string().required("Field is required.").meta({
      example: "John",
    }),
    last_name: string().required("Field is required.").meta({
      example: "Doe",
    }),
    photo: string().required("Field is required.").meta({
      example: "123e4567-e89b-12d3-a456-426614174000",
      description: "Photo ID from media plugin",
    }),
  }),
  response: object({
    200: object({
      status: string().meta({
        example: "ok",
      }),
    }).meta({
      description: "Profile updated successfully",
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
  tags: ["Authentication"],
  summary: "Update current user profile",
  description: "Update authenticated user's profile information",
});
