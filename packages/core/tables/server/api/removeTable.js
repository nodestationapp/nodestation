import path from "path";
import { promises as fs_promise } from "fs";

import { rootPath } from "@nstation/utils";

export default async (req, res) => {
  const { id } = req?.params;

  try {
    await fs_promise.rm(path.join(rootPath, "src", "tables", id), {
      recursive: true,
      force: true,
    });

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
