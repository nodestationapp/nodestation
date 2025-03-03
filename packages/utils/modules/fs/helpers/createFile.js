import fs from "fs";
import path from "path";
import slugify from "slugify";

import rootPath from "#modules/rootPath.js";

import removeEmptyKeys from "./removeEmptyKeys.js";
import checkEntryExist from "../helpers/checkEntryExists.js";
import generateCustomId from "../helpers/generateCustomId.js";
import folderNameParser from "../helpers/folderNameParser.js";
import generateServer from "../helpers/generateServer/index.js";

const createFile = async ({ body, entry_id, type }) =>
  new Promise(async (resolve, reject) => {
    const id = entry_id || generateCustomId(type);

    const folder = folderNameParser(type);
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
      const slug = slugify(body?.name, {
        replacement: "_",
        lower: true,
      });

      body = {
        ...body,
        table: type === "tbl" ? slug : id === "auth" ? "nodestation_users" : id,
        fields: removeEmptyKeys(body?.fields),
      };
    }

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
