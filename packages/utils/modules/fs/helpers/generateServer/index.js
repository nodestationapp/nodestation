import fs from "fs";
import path from "path";
import rootPath from "#modules/rootPath.js";

import crons from "./crons.js";
import emails from "./emails.js";
import controllers from "./controllers.js";
import middlewares from "./middlewares.js";

const readFilesContent = (folderPath) => {
  let filesContent = [];

  const items = fs
    .readdirSync(folderPath, { withFileTypes: true })
    ?.filter((item) => path.extname(item?.name) === ".json");

  for (const item of items) {
    const itemPath = path.join(folderPath, item.name);

    if (item.isDirectory()) {
      filesContent = filesContent.concat(readFilesContent(itemPath));
    } else if (item.isFile()) {
      const id = item.name?.split(".")?.[0];
      const type = id?.split("_")?.[0];

      const fileContent = fs.readFileSync(itemPath, "utf-8");
      filesContent.push({
        id,
        type,
        ...JSON.parse(fileContent),
      });
    }
  }

  return filesContent;
};

const getEditorFiles = () => {
  let files = [];
  const srcPath = path.join(rootPath, "src");
  const foldersToSearch = ["endpoints", "crons", "helpers", "middlewares"];

  for (const folder of foldersToSearch) {
    const folderPath = path.join(srcPath, folder);
    if (fs.existsSync(folderPath)) {
      files = files.concat(readFilesContent(folderPath));
    }
  }

  return files;
};

const serverGenerator = async () => {
  try {
    const editor = getEditorFiles();

    const all_endpoints = editor?.filter(
      (item) =>
        (!("status" in item) || item.status === "active") &&
        (item?.type === "ep" || item?.type === "cron" || item?.type === "mid")
    );

    const all_crons = all_endpoints?.filter((item) => item?.type === "cron");
    const all_middlewares = all_endpoints?.filter(
      (item) => item?.type === "mid"
    );

    await controllers({ endpoints: all_endpoints });
    await crons({ crons: all_crons });
    await middlewares({ middlewares: all_middlewares });
    await emails();
  } catch (error) {
    console.error(error);
  }
};

export default serverGenerator;
