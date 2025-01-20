import path from "path";
import fs_sys from "fs";
import { promises as fs_promise } from "fs";
import rootPath from "#modules/rootPath.js";

export default async ({ endpoints }) => {
  const currentPath = path.join(rootPath, ".nodestation", "files");

  if (!!!fs_sys.existsSync(currentPath)) {
    await fs_promise.mkdir(currentPath, {
      recursive: true,
    });
  }

  const allFiles = await fs_promise.readdir(currentPath);
  const filesMap = new Set(allFiles);

  for await (const item of endpoints) {
    const filePath = path.join(currentPath, `${item?.id}.js`);

    await fs_promise.writeFile(filePath, item?.content);

    filesMap.delete(`${item?.id}.js`);
  }

  for await (const file of filesMap) {
    const filePath = path.join(currentPath, file);
    if (fs_sys.existsSync(filePath)) {
      await fs_promise.unlink(filePath);
    }
  }
};
