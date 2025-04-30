import fs from "fs";
import path from "path";
import { glob } from "glob";
import rootPath from "../../rootPath.js";

function findSchemasWithTableName(filePaths, targetTableName) {
  for (const filePath of filePaths) {
    try {
      const rawData = fs.readFileSync(filePath, "utf-8");
      const jsonData = JSON.parse(rawData);

      if (jsonData.tableName === targetTableName) {
        return jsonData;
      }
    } catch (err) {
      console.error(err);
    }
  }
}

// const paths = [
//   `${path.join(rootPath, "plugins", "**", "server", "schemas", "*.json")}`,
//   `${path.join(rootPath, "packages", "core", "**", "server", "schemas", "*.json")}`,
// ];

const getSchema = (tableName) => {
  try {
    const items = glob.sync(
      path.join(rootPath, "src", "schemas", "**", "*.json"),
      { nodir: true }
    );
    const schema = findSchemasWithTableName(items, tableName);
    return schema;
  } catch (error) {
    console.error("Error reading directory structure:", error);
    throw error;
  }
};

export default getSchema;
