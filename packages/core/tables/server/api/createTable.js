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

    const crud_template = `import getTable from "@nstation/tables/server/api/getTable.js";
import createTable from "@nstation/tables/server/api/createTableEntry.js";
import updateTable from "@nstation/tables/server/api/updateTableEntry.js";
import removeTable from "@nstation/tables/server/api/removeTableEntries.js";

export default [
  {
    method: "POST",
    path: "/p/tables/${slug}",
    handler: createTable,
    middlewares: [],
  },
  {
    method: "GET",
    path: "/p/tables/${slug}",
    handler: getTable,
    middlewares: [],
  },
  {
    method: "PUT",
    path: "/p/tables/${slug}/:entry_id",
    handler: updateTable,
    middlewares: [],
  },
  {
    method: "DELETE",
    path: "/p/tables/${slug}/:entry_id",
    handler: removeTable,
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
