import fs_sys from "fs";
import path from "path";
import { glob } from "glob";
import { createRequire } from "module";
import { fs, rootPath } from "@nstation/utils";

export default async (req, res) => {
  try {
    let tableFiles = glob.sync(path.join(rootPath, "src", "tables", "*.json"));

    const require = createRequire(import.meta.url);
    const filePath = require.resolve(
      "@nstation/auth/server/schemas/nodestation_users.json"
    );

    tableFiles.push(filePath);

    let tables = [];

    for (const file of tableFiles) {
      const schema = JSON.parse(fs_sys.readFileSync(file, "utf8"));
      const table = fs.getSchema(schema?.tableName);
      table.id = table.tableName;

      tables.push(table);
    }

    return res.status(200).json(tables);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
