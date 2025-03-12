import path from "path";
import { promises as fs } from "fs";

import rootPath from "#modules/rootPath.js";
import generateServer from "./generateServer/index.js";

const createFile = async ({ content, path: file_path }) =>
  new Promise(async (resolve, reject) => {
    const path_extension = path.extname(file_path).slice(1);

    try {
      const directory = path.join(rootPath, file_path);
      let file_content = content;

      if (path_extension === "json") {
        file_content = JSON.stringify(content, null, 2);
      }

      await fs.mkdir(path.dirname(directory), { recursive: true });

      await fs.writeFile(directory, file_content, {
        flag: "wx",
        encoding: "utf8",
      });
    } catch (err) {
      if (err.code === "EEXIST") {
        return reject({ error: "File already exist." });
      }
    }

    generateServer();

    return resolve("ok");
  });

export default createFile;
