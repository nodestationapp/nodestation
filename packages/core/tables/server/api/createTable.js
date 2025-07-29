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
      displayName: "id",
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

    const table_path = path.join(rootPath, "src", "tables", slug);

    await fs_promise.mkdir(path.join(table_path, "schemas"), {
      recursive: true,
    });
    await fs_promise.mkdir(path.join(table_path, "api"), {
      recursive: true,
    });

    await fs_promise.writeFile(
      path.join(table_path, "schemas", `${slug}.json`),
      JSON.stringify(formatted_body, null, 2)
    );

    const crud_template = `import getTable from "@nstation/tables/server/utils/crud/get.js";
import upsertTable from "@nstation/tables/server/utils/crud/create.js";
import deleteTable from "@nstation/tables/server/utils/crud/delete.js";

export default [
  {
    method: "POST",
    path: "/tables/${slug}",
    handler: upsertTable,
    middlewares: [],
  },
  {
    method: "GET",
    path: "/tables/${slug}",
    handler: getTable,
    middlewares: [],
  },
  {
    method: "PUT",
    path: "/tables/${slug}/:id",
    handler: upsertTable,
    middlewares: [],
  },
  {
    method: "DELETE",
    path: "/tables/${slug}/:id",
    handler: deleteTable,
    middlewares: [],
  },
];
`;

    await fs_promise.writeFile(
      path.join(table_path, "api", "index.js"),
      crud_template
    );

    return res.status(200).json({ id: slug });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
