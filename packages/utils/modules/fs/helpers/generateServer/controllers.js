import path from "path";
import fs_sys from "fs";
import { promises as fs_promise } from "fs";
import rootPath from "#modules/rootPath.js";

export default async ({ endpoints }) => {
  const current_path = path.join(rootPath, ".nodestation", "files");

  if (!!!fs_sys.existsSync(current_path)) {
    await fs_promise.mkdir(current_path, {
      recursive: true,
    });
  }

  for await (const item of endpoints) {
    await fs_promise.writeFile(
      path.join(current_path, `${item?.id}.js`),
      item?.content
    );
  }
};
