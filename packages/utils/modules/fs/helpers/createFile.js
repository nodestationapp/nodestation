import path from "path";
import { promises as fs } from "fs";

import rootPath from "#modules/rootPath.js";

const createFile = async ({ content, path: file_path }) =>
  new Promise(async (resolve, reject) => {
    try {
      const directory = path.join(rootPath, file_path);

      await fs.mkdir(path.dirname(directory), { recursive: true });
      await fs.writeFile(directory, content, { flag: "wx" });
    } catch (err) {
      if (err.code === "EEXIST") {
        return reject({ error: "File already exist." });
      }
    }

    // generateServer();

    return resolve("ok");
  });

export default createFile;
