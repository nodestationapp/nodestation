import fs from "fs";
import path from "path";
import { rootPath } from "@nstation/utils";
import requireFromString from "require-from-string";

export default async (req, res) => {
  try {
    let config = fs.readFileSync(
      path.join(rootPath, "nodestation.config.js"),
      "utf-8"
    );

    const parsedConfig = requireFromString(config);

    let site = parsedConfig.site;
    site.logo = `${process.env.PUBLIC_URL}${site.logo}`;
    site.favicon = `${process.env.PUBLIC_URL}${site.favicon}`;

    return res.status(200).json(site);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
