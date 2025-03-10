import fs from "fs";
import path from "path";

import rootPath from "#modules/rootPath.js";

const getFiles = (folders = [], options = {}) => {
  let files = [];
  const srcPath = path.join(rootPath, options?.rootFolder || "src_new");

  const traverseDirectory = (folderPath, relativePath = "") => {
    const items = fs.readdirSync(folderPath, { withFileTypes: true });
    const children = [];

    const rootFolder = options?.rootFolder || "src_new";

    items.forEach((item) => {
      const itemPath = path.join(folderPath, item.name);
      const itemRelativePath = path.join("/", relativePath, item.name);
      let name = item.name;

      const fullPath = itemPath.split(rootFolder + "/")[1];
      const type = fullPath ? fullPath.split("/")[0] : null;

      if (item.isDirectory()) {
        const folder = {
          name,
          metadata: {
            type: "folder",
            path: itemRelativePath,
          },
          children: traverseDirectory(itemPath, itemRelativePath),
        };
        children.push(folder);
      } else {
        const content = fs.readFileSync(itemPath, "utf8");

        children.push({
          name,
          metadata: {
            type,
            content,
            path: itemRelativePath,
          },
        });
      }
    });

    return children;
  };

  try {
    folders.forEach((folder) => {
      const folderPath = path.join(srcPath, folder);

      if (fs.existsSync(folderPath)) {
        const folderStructure = {
          name: folder,
          metadata: {
            type: "folder",
          },
          children: traverseDirectory(folderPath, folder),
        };
        files.push(folderStructure);
      }
    });

    files.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Error reading directory structure:", error);
    throw error;
  }

  return files;
};

export default getFiles;
