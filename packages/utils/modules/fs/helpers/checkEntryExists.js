import fs from "fs";
import path from "path";

import rootPath from "#modules/rootPath.js";
import folderNameParser from "./folderNameParser.js";
import readFilesContent from "./readFilesContent.js";

const checkEntryExist = (body, entry_id) => {
  let files = [];

  const folders = [folderNameParser(body?.type)];
  const srcPath = path.join(rootPath, "src");

  for (const folder of folders) {
    const folderPath = path.join(srcPath, folder);
    if (fs.existsSync(folderPath)) {
      files = files.concat(readFilesContent(folderPath));
    }
  }

  let is_file = false;
  if (body?.type === "ep") {
    is_file = files?.find(
      (item) =>
        item?.name === body?.name &&
        item?.options?.method === body?.options?.method
    );
  } else {
    is_file = files?.find((item) => item?.name === body?.name);
  }

  if (is_file?.id === entry_id) {
    is_file = false;
  }

  return !!is_file;
};

export default checkEntryExist;
