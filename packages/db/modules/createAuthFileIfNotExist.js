import path from "path";
import fs_sys from "fs";
import { fs, rootPath } from "../../utils/index.js";

export default async () => {
  try {
    const body = {
      fields: [
        {
          name: "id",
          slug: "id",
          type: "uuid",
          required: true,
          origin: "system",
          primary_key: true,
          read_only: true,
          default: "generate_uuid()",
        },
        {
          name: "Email",
          slug: "email",
          type: "short_text",
          required: true,
          origin: "system",
        },
        {
          name: "Password",
          slug: "password",
          type: "short_text",
          origin: "system",
          required: true,
        },
        {
          name: "First name",
          slug: "first_name",
          type: "short_text",
          origin: "system",
          required: true,
        },
        {
          name: "Last name",
          slug: "last_name",
          type: "short_text",
          origin: "system",
          required: true,
        },
        {
          name: "Photo",
          slug: "photo",
          type: "media",
          origin: "system",
        },
        {
          name: "Type",
          slug: "type",
          type: "enumeration",
          origin: "system",
          required: true,
          options: "admin",
        },
        {
          name: "Status",
          slug: "status",
          type: "enumeration",
          options: "active\ninactive",
          default: "inactive",
          origin: "system",
          required: true,
        },
        {
          name: "Created at",
          slug: "created_at",
          type: "short_text",
          origin: "system",
          required: true,
        },
      ],
    };
    if (!!!fs_sys.existsSync(path.join(rootPath, "src", "auth.json"))) {
      await fs.updateFile("auth", body);
    }
  } catch (error) {
    console.error(`${error}`);
  }
};
