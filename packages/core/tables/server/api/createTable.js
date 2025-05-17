import path from "path";
import slugify from "slugify";
import { promises as fs_promise } from "fs";

import { rootPath } from "@nstation/utils";

export default async (req, res) => {
  const { name } = req?.body;

  try {
    const slug = slugify(name, { lower: true, replacement: "_" });

    const formatted_body = {
      name: name,
      tableName: slug,
      display_name: "id",
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
      ],
    };

    const table_path = path.join(rootPath, "src", "tables");

    try {
      await fs_promise.stat(table_path);
    } catch (err) {
      await fs_promise.mkdir(table_path);
    }

    await fs_promise.writeFile(
      path.join(table_path, `${slug}.json`),
      JSON.stringify(formatted_body, null, 2)
    );

    return res.status(200).json({ id: slug });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
