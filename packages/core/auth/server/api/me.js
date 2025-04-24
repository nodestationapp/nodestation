import path from "path";
import fs_sys from "fs";
import { knex } from "@nstation/db";
import { fs, rootPath } from "@nstation/utils";

export default async (req, res) => {
  const user = req?.user;

  try {
    let forms_count = 0;
    const forms = fs.getFiles(["forms"]);

    for await (const item of forms) {
      try {
        const unread_count = await knex(item?.id)
          .where({
            is_read: 0,
            archived: 0,
          })
          .count("* as count")
          .first()
          .then((row) => row.count);

        forms_count += unread_count;
      } catch (err) {
        console.error(err);
      }
    }

    const logs_count = await knex("nodestation_logs")
      .where({ is_read: 0 })
      .count("* as count")
      .first()
      .then((row) => row.count);

    const packagePath = path.join(rootPath, "package.json");
    const fileContent = fs_sys.readFileSync(packagePath, "utf-8");
    const packageJson = JSON.parse(fileContent);

    const settings = await knex("nodestation_media_settings").first();
    const userPhoto = user?.photo || null;

    const formatted_user = {
      ...user,
      ...(!!userPhoto
        ? {
            photo: {
              url:
                settings?.active === "local"
                  ? `${process.env.PUBLIC_URL}${userPhoto?.url}`
                  : userPhoto?.url,
            },
          }
        : {}),
    };

    return res.status(200).json({
      forms_count,
      logs_count,
      user: formatted_user,
      project_name: packageJson?.name,
      plugins: req?.plugins,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
