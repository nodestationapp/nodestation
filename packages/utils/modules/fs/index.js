import path from "path";
import { promises as fs_promise } from "fs";

import rootPath from "#modules/rootPath.js";
import getFiles from "./helpers/getFiles.js";
import createFile from "./helpers/createFile.js";
import folderNameParser from "./helpers/folderNameParser.js";
import generateServer from "./helpers/generateServer/index.js";

const updateFile = async (id, body) =>
  new Promise(async (resolve, reject) => {
    try {
      await createFile(body, id);

      return resolve(true);
    } catch (err) {
      return reject(err);
    }
  });

const deleteFile = async (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const type = id?.split("_")?.[0];
      const folder = folderNameParser(type);
      await fs_promise.unlink(path.join(rootPath, "src", folder, `${id}.json`));

      generateServer();

      return resolve();
    } catch (err) {
      reject(err);
    }
  });

export default { getFiles, createFile, updateFile, deleteFile, generateServer };
