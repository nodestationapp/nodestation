import fs from "fs";
import path from "path";
import { knex } from "@nstation/db";
import { rootPath } from "@nstation/utils";
import requireFromString from "require-from-string";

export default async (req, res) => {
  try {
    const admin_count = await knex("nodestation_users")
      .where({
        type: "superadmin",
        status: "active",
      })
      .count("* as count")
      .first()
      .then((row) => row.count);

    let config = fs.readFileSync(
      path.join(rootPath, "nodestation.config.js"),
      "utf-8"
    );

    const parsedConfig = requireFromString(config);

    let site = parsedConfig.site;
    site.logo = `${process.env.PUBLIC_URL}${site.logo}`;
    site.favicon = `${process.env.PUBLIC_URL}${site.favicon}`;

    return res.status(200).json({
      site,
      is_admin: !!admin_count,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
