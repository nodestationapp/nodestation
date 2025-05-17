import path from "path";
import fs_sys from "fs";
import { fs, rootPath } from "@nstation/utils";

export default async (req, res) => {
  const body = req?.body;
  const { id } = req?.params;
  const { extendable } = req?.query;

  const content = {
    tableName: id,
    ...body,
  };

  try {
    if (extendable === "true") {
      const schema_path = path.join(
        rootPath,
        "src",
        "extensions",
        "schemas",
        `${id}.json`
      );

      fs_sys.existsSync(schema_path);

      await fs.updateFile({
        content,
        path: `/src/extensions/schemas/${id}.json`,
      });
    } else {
      await fs.updateFile({
        content,
        path: `/src/tables/${id}.json`,
      });
    }

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
