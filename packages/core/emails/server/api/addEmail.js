import path from "path";
import { promises as fs_promise } from "fs";
import { rootPath } from "@nstation/utils";

export default async (req, res) => {
  let body = req?.body;
  if (!body?.id) {
    body.id = Math.floor(Math.random() * 1000000);
  }

  try {
    await fs_promise.mkdir(path.join(rootPath, "src", "emails"), {
      recursive: true,
    });

    await fs_promise.writeFile(
      path.join(rootPath, "src", "emails", `${body?.id}.json`),
      JSON.stringify(body, null, 2)
    );

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
