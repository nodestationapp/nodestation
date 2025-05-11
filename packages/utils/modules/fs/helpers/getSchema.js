import fs from "fs";
import path from "path";
import { glob } from "glob";
import rootPath from "../../rootPath.js";

function findSchemasWithTableName(filePaths, targetTableName, extension_items) {
  let schema;

  for (const filePath of filePaths) {
    try {
      const rawData = fs.readFileSync(filePath, "utf-8");
      const jsonData = JSON.parse(rawData);

      if (jsonData.tableName === targetTableName) {
        schema = jsonData;
      }
    } catch (err) {
      console.error(err);
    }
  }

  for (const extension_item of extension_items) {
    try {
      const rawData = fs.readFileSync(extension_item, "utf-8");
      const jsonData = JSON.parse(rawData);

      if (jsonData.tableName === targetTableName) {
        schema = jsonData;
      }
    } catch (err) {
      console.error(err);
    }
  }

  return schema;
}

// const paths = [
//   `${path.join(rootPath, "plugins", "**", "server", "schemas", "*.json")}`,
//   `${path.join(rootPath, "packages", "core", "**", "server", "schemas", "*.json")}`,
// ];

const getSchema = (tableName) => {
  try {
    const items = glob.sync(
      path.join(
        rootPath,
        "packages",
        "core",
        "**",
        "server",
        "schemas",
        "*.json"
      ),
      { nodir: true }
    );

    const extension_items = glob.sync(
      path.join(rootPath, "src", "extensions", "schemas", "*.json"),
      { nodir: true }
    );

    const schema = findSchemasWithTableName(items, tableName, extension_items);
    return schema;
  } catch (error) {
    console.error("Error reading directory structure:", error);
    throw error;
  }
};

export default getSchema;
