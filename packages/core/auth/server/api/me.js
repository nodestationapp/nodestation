import path from "path";
import fs_sys from "fs";
import { knex } from "@nstation/db";
import { rootPath } from "@nstation/utils";

export default async (req, res) => {
  const user = req?.user;

  try {
    let auth_templates = await knex("nodestation_users_settings").first();

    if (!auth_templates) {
      auth_templates = await knex("nodestation_users_settings")
        .insert({
          email_verification_template: "email-activation",
          forget_password_template: "password-reset",
        })
        .returning("*")
        .then((data) => data[0]);
    }

    const packagePath = path.join(rootPath, "package.json");
    const fileContent = fs_sys.readFileSync(packagePath, "utf-8");
    const packageJson = JSON.parse(fileContent);

    return res.status(200).json({
      user,
      templates: auth_templates,
      project_name: packageJson?.name,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
