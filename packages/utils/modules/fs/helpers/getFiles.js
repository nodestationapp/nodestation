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
        const properties = getFileProperties(content);
        dataToPush = { id: index + 1, properties };
      }

      if (!!dataToPush) {
        files.push(dataToPush);
      }
    });

    // folders.forEach((folder) => {
    //   const folderPath = path.join(srcPath, folder);
    //   const isFile = folderPath.includes(".");

    //   if (fs.existsSync(folderPath)) {
    //     const pattern = isFile ? folderPath : path.join(folderPath, "**/*");
    //     const items = glob.sync(pattern, { nodir: true });

    //     const children = items.map((itemPath) => {
    //       const itemRelativePath = path.relative(srcPath, itemPath);
    //       const name = path.basename(itemPath);
    //       let content = fs.readFileSync(itemPath, "utf8");
    //       if (name.endsWith(".json")) {
    //         try {
    //           content = JSON.parse(content);
    //         } catch (parseError) {
    //           console.error(`Error parsing JSON file: ${itemPath}`, parseError);
    //         }
    //       }
    //       const type = itemRelativePath.split(path.sep)[0];

    //       return {
    //         name,
    //         metadata: {
    //           type,
    //           content,
    //           path: itemRelativePath,
    //         },
    //       };
    //     });

    //     const folderStructure = {
    //       name: folder,
    //       metadata: {
    //         type: isFile ? "file" : "folder",
    //       },
    //       children: isFile ? null : children,
    //     };
    //     files.push(folderStructure);
    //   }
    // });

    // files.sort((a, b) => a?.id?.localeCompare(b?.id));
  } catch (error) {
    console.error("Error reading directory structure:", error);
    throw error;
  }

  return files;
};

export default getFiles;
