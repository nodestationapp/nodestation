import { number, object, string } from "yup";

export default object({
  response: object({
    200: object({
      project_name: string().meta({
        example: "Project Name",
      }),
      user: object().meta({
        properties: {
          id: string().meta({
            example: "123e4567-e89b-12d3-a456-426614174000",
          }),
          first_name: string().meta({
            example: "John",
          }),
          last_name: string().meta({
            example: "Doe",
          }),
          email: string().meta({
            example: "john.doe@example.com",
          }),
          password: string().meta({
            example: "********",
          }),
          photo: object().meta({
            properties: {
              id: string().meta({
                example: "123e4567-e89b-12d3-a456-426614174000",
              }),
              name: string().meta({
                example: "avatar.png",
              }),
              url: string().meta({
                example: "https://example.com/avatar.png",
              }),
            },
          }),
          type: string().meta({
            example: "admin",
          }),
          status: string().meta({
            example: "active",
          }),
          created_at: number().meta({
            example: 1751698481,
          }),
        },
      }),
      templates: object().meta({
        properties: {
          email_verification_template: string().meta({
            example: "email-activation",
          }),
          forget_password_template: string().meta({
            example: "forget-password",
          }),
        },
      }),
    }).meta({
      description: "Login successful",
    }),
    500: object({
      errors: string().meta({
        format: "string",
        example: "Something went wrong",
      }),
    }).meta({
      description: "Something went wrong",
    }),
  }),
}).meta({
  tags: ["Authentication"],
  summary: "Get authenticated user details",
  description: "Get details of the authenticated user",
});
