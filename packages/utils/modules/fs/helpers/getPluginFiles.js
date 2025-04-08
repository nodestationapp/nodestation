import fs from "fs";
import path from "path";
import { glob } from "glob";

const parseInput = (input) => {
  if (typeof input !== "string") return input;

  input = input.trim();

  if (input.startsWith("[") && input.endsWith("]")) {
    const content = input.slice(1, -1).trim();
    if (!content) return [];

    return content.split(",").map((item) => item.trim());
  }

  return input;
};

const getFileProperties = (content) => {
  let properties = {};

  const propertyMatch = content?.match(/\* @(\w+) (.*)/g);
  if (propertyMatch) {
    propertyMatch.forEach((match) => {
      const [_, key, value] = match.match(/\* @(\w+) (.*)/);
      properties[key] = parseInput(value);
    });
  }

  return properties;
};

const getPluginFiles = async (pattern, pluginKey, type) => {
  let files = [];

  try {
    const items = glob.sync(pattern, { nodir: true });

    for await (const item of items) {
      // const name = path.basename(item)?.split(".")?.[0];
      // let content = fs.readFileSync(item, "utf8");

      let content;

      if (type === "schema") {
        if (!!content?.tableName) {
          content = await import(item);
          content = content.default?.[0];
          files.push(content);
        }
      } else {
        const name = path.basename(item)?.split(".")?.[0];
        const parts = item.split(`/api/`);
        content = fs.readFileSync(item, "utf8");
        const schemaPath = parts.length > 1 ? `/${parts[1]}` : null;
        const properties = getFileProperties(content);

        files.push({
          name,
          content,
          properties,
          filePath: item,
          path: `/plugins/${pluginKey}${schemaPath.replace(/\/[^\/]+$/, "")}`,
        });
      }

      if (path.basename(item).endsWith(".json")) {
        // const parts = item.split("/schemas/");
        // const schemaPath = parts.length > 1 ? `/schemas/${parts[1]}` : null;
        // files.push({ id: name, schema: schemaPath, ...JSON.parse(content) });
      } else if (path.basename(item).endsWith(".js")) {
        // const parts = item.split(`/api/`);
        // const schemaPath = parts.length > 1 ? `/${parts[1]}` : null;
        // const properties = getFileProperties(content);
        // if (content.default) {
        //   files.push({
        //     name,
        //     content,
        //     properties,
        //     filePath: item,
        //     path: `/plugins/${pluginKey}${schemaPath.replace(/\/[^\/]+$/, "")}`,
        //   });
        // }
      }
    }
  } catch (error) {
    console.error("Error reading directory structure:", error);
    throw error;
  }

  return files;
};

export default getPluginFiles;
