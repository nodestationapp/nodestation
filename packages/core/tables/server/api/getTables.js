import fs from "fs";
import path from "path";
import { glob } from "glob";
import { rootPath } from "@nstation/utils";

export default async (req, res) => {
  try {
    const tableFiles = glob.sync(
      path.join(rootPath, "src", "tables", "*.json")
    );

    let tables = [];

    for (const file of tableFiles) {
      const table = JSON.parse(fs.readFileSync(file, "utf8"));
      tables.push(table);
    }

    return res.status(200).json(tables);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
