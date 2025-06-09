import path from "path";
import { promises as fs_promise } from "fs";

import { fs, rootPath } from "@nstation/utils";

export default async (req, res) => {
  const body = req?.body;
  const { id } = req?.params;
  const { extendable } = req?.query;

  const content = {
    ...body,
    tableName: id,
  };

  try {
    if (extendable === "true") {
      await fs_promise.mkdir(
        path.join(rootPath, "src", "extensions", "schemas"),
        { recursive: true }
      );

      await fs.updateFile({
        content,
        path: `/src/extensions/schemas/${id}.json`,
      });
    } else {
      await fs_promise.mkdir(path.join(rootPath, "src", "tables"), {
        recursive: true,
      });

      await fs.updateFile({
        content,
        path: `/src/tables/${id}/schemas/${id}.json`,
      });
    }

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
