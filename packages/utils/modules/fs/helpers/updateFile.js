import path from "path";
import { promises as fs } from "fs";

import rootPath from "#modules/rootPath.js";

const updateFile = async ({ content, path: file_path, new_path }) =>
  new Promise(async (resolve, reject) => {
    if (!!content) {
      await fs.writeFile(path.join(rootPath, file_path), content);
    }

    if (!!new_path) {
      const old_directory = path.join(rootPath, file_path);
      const new_directory = path.join(rootPath, new_path);

      try {
        await fs.access(new_directory);
        return reject({ error: "File already exist." });
      } catch (err) {
        await fs.mkdir(path.dirname(new_directory), { recursive: true });
        await fs.rename(old_directory, new_directory);

        const sourceDir = path.dirname(old_directory);
        const files = await fs.readdir(sourceDir);

        if (files.length === 0) {
          await fs.rmdir(sourceDir);
        }
      }
    }

    // generateServer();

    return resolve("ok");
  });

export default updateFile;
