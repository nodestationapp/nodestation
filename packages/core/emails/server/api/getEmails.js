import fs from "fs";
import path from "path";
import { glob } from "glob";
import { rootPath } from "@nstation/utils";

export default async (req, res) => {
  let { page = 0, sort, pageSize = 20 } = req.query;

  if (!!sort) {
    sort = sort?.split(":");
    sort = {
      field: sort?.[0],
      sort: sort?.[1],
    };
  }

  try {
    let emailFiles = glob.sync(path.join(rootPath, "src", "emails", "*.json"));

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    let emails = [];

    for (const file of emailFiles) {
      const email = JSON.parse(fs.readFileSync(file, "utf8"));
      emails.push(email);
    }

    if (!!sort) {
      emails.sort((a, b) =>
        sort?.sort === "asc"
          ? a[sort?.field].localeCompare(b[sort?.field])
          : b[sort?.field].localeCompare(a[sort?.field])
      );
    }

    const paginatedFiles = emails.slice(startIndex, endIndex);

    return res.status(200).json({
      data: paginatedFiles,
      meta: { page: page, pageSize, count: emailFiles.length },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
