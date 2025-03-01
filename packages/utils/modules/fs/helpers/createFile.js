import fs from "fs";
import path from "path";

import rootPath from "#modules/rootPath.js";

import checkEntryExist from "../helpers/checkEntryExists.js";
import generateCustomId from "../helpers/generateCustomId.js";
import folderNameParser from "../helpers/folderNameParser.js";
import generateServer from "../helpers/generateServer/index.js";
import removeEmptyKeys from "./removeEmptyKeys.js";

const createFile = async (body, entry_id) =>
  new Promise(async (resolve, reject) => {
    const id = entry_id || generateCustomId(body?.type);

    const folder = folderNameParser(body?.type);
    if (!!!folder) {
      return reject("Invalid folder");
    }

    const file_exist = checkEntryExist(body, entry_id);
    if (!!file_exist) {
      return reject({ error: "File already exist" });
    }

    const directory = path.join(rootPath, "src", folder);

    if (!!!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    delete body.type;

    if (!!body?.fields) {
      body = {
        ...body,
        fields: removeEmptyKeys(body?.fields),
      };
    }

    console.log(body);

    const jsonContent = JSON.stringify(body, null, 2);
    fs.writeFileSync(
      path.join(rootPath, "src", folder, `${id}.json`),
      jsonContent,
      "utf8"
    );

    generateServer();

    return resolve(id);
  });

export default createFile;
