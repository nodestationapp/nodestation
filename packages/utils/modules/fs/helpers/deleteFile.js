import path from "path";
import { promises as fs } from "fs";

import rootPath from "#modules/rootPath.js";
import generateServer from "./generateServer/index.js";
const deleteFile = async (file_path) =>
  new Promise(async (resolve, reject) => {
    try {
      const directory = path.join(rootPath, file_path);

      await fs.unlink(directory);

      const sourceDir = path.dirname(directory);
      const files = await fs.readdir(sourceDir);

      if (files.length === 0) {
        await fs.rmdir(sourceDir);
      }

      generateServer();

      return resolve();
    } catch (err) {
      reject(err);
    }
  });

export default deleteFile;
