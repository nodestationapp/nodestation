import fs from "fs";
import path from "path";

import rootPath from "#modules/rootPath.js";
import readFilesContent from "../helpers/readFilesContent.js";

const getFiles = (folders = [""]) => {
  let files = [];
  const srcPath = path.join(rootPath, "src");

  for (const folder of folders) {
    const folderPath = path.join(srcPath, folder);
    if (fs.existsSync(folderPath)) {
      files = files.concat(readFilesContent(folderPath));
    }
  }

  return files;
};

export default getFiles;
