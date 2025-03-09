import fs from "fs";
import path from "path";

import rootPath from "#modules/rootPath.js";

const getFiles = (folders = []) => {
  let files = [];
  const srcPath = path.join(rootPath, "src_new");

  const traverseDirectory = (folderPath, relativePath = "") => {
    const items = fs.readdirSync(folderPath, { withFileTypes: true });
    const children = [];

    console.log(items);

    items.forEach((item) => {
      const itemPath = path.join(folderPath, item.name);
      const itemRelativePath = path.join(
        "/",
        relativePath,
        item.name.replace(".js", "")
      );
      const name = item.name.replace(".js", "");

      const fullPath = itemPath.split("src_new/")[1];
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
        children.push({
          name,
          metadata: {
            type,
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

    files.forEach((folder) => {
      if (folder.children) {
        folder.children.sort((a, b) => {
          if ((!a.children && !b.children) || (a.children && b.children)) {
            return a.name.localeCompare(b.name);
          }
          if (a.children && !b.children) return -1;
          if (!a.children && b.children) return 1;
          return 0;
        });

        if (folder.children.length > 0) {
          folder.children.forEach((child) => {
            if (child.children && child.children.length > 0) {
              child.children.sort((a, b) => {
                if (
                  (!a.children && !b.children) ||
                  (a.children && b.children)
                ) {
                  return a.name.localeCompare(b.name);
                }
                if (a.children && !b.children) return -1;
                if (!a.children && b.children) return 1;
                return 0;
              });
            }
          });
        }
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
