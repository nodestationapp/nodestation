import fs from "fs";
import path from "path";
import { glob } from "glob";
import rootPath from "../../rootPath.js";

function findSchemasWithTableName(
  filePaths,
  targetTableName,
  extension_items = []
) {
  let schema;

  for (const filePath of filePaths) {
    try {
      const rawData = fs.readFileSync(filePath, "utf-8");
      const jsonData = JSON.parse(rawData);

      if (jsonData.tableName === targetTableName) {
        schema = jsonData;
        schema.id = jsonData.tableName;
        break;
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

const getSchema = (tableName) => {
  try {
    let items = glob.sync(
      path.join(
        rootPath,
        "node_modules",
        "@nstation",
        "**",
        "server",
        "schemas",
        "*.json"
      ),
      { nodir: true }
    );

    const table_schemas = glob.sync(
      path.join(rootPath, "src", "tables", "**", "schemas", "*.json"),
      {
        nodir: true,
      }
    );

    items = [...items, ...table_schemas];

    const extension_items = glob.sync(
      path.join(rootPath, "src", "extensions", "schemas", "*.json"),
      { nodir: true }
    );

    let schema = findSchemasWithTableName(items, tableName, extension_items);

    schema?.fields?.forEach((field) => {
      if (!!field.relation) {
        let relatedTable = findSchemasWithTableName(items, field.relation);

        field.relation = {
          table: field.relation,
          displayName: relatedTable.displayName,
        };
      }
    });

    return schema;
  } catch (error) {
    console.error("Error reading directory structure:", error);
    throw error;
  }
};

export default getSchema;
