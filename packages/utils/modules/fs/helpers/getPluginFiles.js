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

const getPluginFiles = (pattern, pluginKey) => {
  let files = [];

  try {
    const items = glob.sync(pattern, { nodir: true });

    items.forEach((item) => {
      const name = path.basename(item)?.split(".")?.[0];
      let content = fs.readFileSync(item, "utf8");

      if (path.basename(item).endsWith(".json")) {
        const parts = item.split("/schemas/");
        const schemaPath = parts.length > 1 ? `/schemas/${parts[1]}` : null;

        files.push({ id: name, schema: schemaPath, ...JSON.parse(content) });
      } else if (path.basename(item).endsWith(".js")) {
        const parts = item.split(`/api/`);
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
    });
  } catch (error) {
    console.error("Error reading directory structure:", error);
    throw error;
  }

  return files;
};

export default getPluginFiles;
