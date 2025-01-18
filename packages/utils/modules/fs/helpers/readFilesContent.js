import fs from "fs";
import path from "path";

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

export default readFilesContent;
