import fs from "fs";
import path from "path";
import { glob } from "glob";

import rootPath from "#modules/rootPath.js";

function parseInput(input) {
  if (typeof input !== "string") return input;

  input = input.trim();

  if (input.startsWith("[") && input.endsWith("]")) {
    const content = input.slice(1, -1).trim();
    if (!content) return [];

    return content.split(",").map((item) => item.trim());
  }

  return input;
}

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

function extractDynamicPath(path) {
  const parts = path.split("/").filter(Boolean);
  if (parts.length < 2 || parts[0] !== "endpoints") return null;

  return "/" + parts.slice(1, -1).join("/");
}

const getFiles = (pattern) => {
  let files = [];

  try {
    if (Array.isArray(pattern)) {
      pattern = pattern?.map((item) => path.join(rootPath, item));
    } else {
      pattern = path.join(rootPath, pattern);
    }

    const items = glob.sync(pattern, { nodir: true });

    items.forEach((item) => {
      const name = path.basename(item)?.split(".")?.[0];
      let content = fs.readFileSync(item, "utf8");

      let dataToPush = null;

      if (path.basename(item).endsWith(".json")) {
        const parts = item.split("/schemas/");
        const schemaPath = parts.length > 1 ? `/schemas/${parts[1]}` : null;

        dataToPush = { id: name, schema: schemaPath, ...JSON.parse(content) };
      } else if (path.basename(item).endsWith(".js")) {
        const parts = item.split("/src/");
        const schemaPath = parts.length > 1 ? `/${parts[1]}` : null;

        const properties = getFileProperties(content);

        dataToPush = {
          name,
          content,
          properties,
          path: extractDynamicPath(schemaPath),
        };
      }

      if (!!dataToPush) {
        files.push(dataToPush);
      }
    });
  } catch (error) {
    console.error("Error reading directory structure:", error);
    throw error;
  }

  return files;
};

export default getFiles;
