import path from "path";
import fs_sys from "fs";
import { fs, rootPath } from "../../utils/index.js";

export default async () => {
  try {
    const body = {
      slug: "nodestation_users",
      fields: [
        {
          name: "ID",
          slug: "id",
          type: "id",
          required: true,
          origin: "system",
          primary_key: true,
          read_only: true,
          default: "generate_id()",
        },
        {
          name: "First name",
          slug: "first_name",
          type: "text",
          origin: "system",
          required: true,
        },
        {
          name: "Last name",
          slug: "last_name",
          type: "text",
          origin: "system",
          required: true,
        },
        {
          name: "Email",
          slug: "email",
          type: "text",
          required: true,
          origin: "system",
        },
        {
          name: "Password",
          slug: "password",
          type: "text",
          origin: "system",
          required: true,
        },
        {
          name: "Status",
          slug: "status",
          type: "select",
          options: [
            {
              color: "#566E39",
              label: "active",
              value: "active",
            },
            {
              color: "#6E3B39",
              label: "inactive",
              value: "inactive",
            },
          ],
          default: "inactive",
          origin: "system",
          required: true,
          variant: "single_select",
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
          type: "select",
          origin: "system",
          required: true,
          options: [
            {
              color: "#65396E",
              label: "admin",
              value: "admin",
            },
            {
              color: "#396A6E",
              label: "client",
              value: "client",
            },
          ],
          default: "client",
          variant: "single_select",
        },
        {
          name: "Created at",
          slug: "created_at",
          type: "date",
          origin: "system",
          required: true,
          default: "now()",
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
