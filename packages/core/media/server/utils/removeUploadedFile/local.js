import fs from "fs";
import path from "path";
import { rootPath } from "@nstation/utils";

const local = async (url) =>
  new Promise(async (resolve, reject) => {
    try {
      fs.rmSync(path.join(rootPath, url), {
        recursive: true,
        force: true,
      });

      const folderPath = path.join(rootPath, path.dirname(url));

      if (
        fs.existsSync(folderPath) &&
        fs.readdirSync(folderPath).length === 0
      ) {
        fs.rmdirSync(folderPath);
      }

      resolve(true);
    } catch (err) {
      console.error(err);
      reject(false);
    }
  });

export default local;
