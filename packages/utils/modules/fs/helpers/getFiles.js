import fs from "fs";
import path from "path";
import { glob } from "glob";

import rootPath from "#modules/rootPath.js";

const getFileProperties = (content) => {
  let properties = {};

  const propertyMatch = content?.match(/\* @(\w+) (.*)/g);
  if (propertyMatch) {
    propertyMatch.forEach((match) => {
      const [_, key, value] = match.match(/\* @(\w+) (.*)/);
      properties[key] = value === "[]" ? [] : value;
    });
  }

  return properties;
};

const getFiles = (pattern) => {
  let files = [];

  try {
    if (Array.isArray(pattern)) {
      pattern = pattern?.map((item) => path.join(rootPath, item));
    } else {
      pattern = path.join(rootPath, pattern);
    }

    const items = glob.sync(pattern, { nodir: true });

    items.forEach((item, index) => {
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
          metadata: {
            method: name,
            type: parts?.[1]?.split("/")?.[0],
          },
          path: schemaPath,
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
