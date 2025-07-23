import { object, string } from "yup";

export default object({
  body: object({
    active: string().meta({
      example: "local",
      enum: ["local", "aws", "digitalocean"],
    }),
    aws: object({
      bucket: string().meta({
        example: "my-bucket",
      }),
      region: string().meta({
        example: "us-east-1",
      }),
      access_key_id: string().meta({
        example: "1234567890",
      }),
      secret_access_key: string().meta({
        example: "1234567890",
      }),
    }),
    digitalocean: object({
      bucket: string().meta({
        example: "my-bucket",
      }),
      region: string().meta({
        example: "us-east-1",
      }),
      spaces_endpoint: string().meta({
        example: "https://nyc3.digitaloceanspaces.com",
      }),
      access_key_id: string().meta({
        example: "1234567890",
      }),
      secret_access_key: string().meta({
        example: "1234567890",
      }),
    }),
  }),
  response: object({
    200: object({
      status: string().meta({
        example: "ok",
      }),
    }).meta({
      description: "Media settings updated successfully",
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
  summary: "Update media settings",
  description: "Update media settings",
});
