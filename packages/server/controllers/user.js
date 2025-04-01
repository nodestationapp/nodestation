import path from "path";
import fs_sys from "fs";
import { knex } from "@nstation/db";
import { fs, rootPath } from "@nstation/utils";

function extractUploadPath(fullPath) {
  const uploadIndex = fullPath.indexOf("/uploads/");
  if (uploadIndex !== -1) {
    return fullPath.substring(uploadIndex);
  }
  return null;
}

const getUserMe = async (req, res) => {
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

const checkIsAdmin = async (req, res) => {
  try {
    const count = await knex("nodestation_users")
      .where({
        type: "admin",
        status: "active",
      })
      .count("* as count")
      .first()
      .then((row) => row.count);

    return res.status(200).json({ is_admin: !!count });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const updateUserMe = async (req, res) => {
  const body = req.body;
  const files = req?.files;

  try {
    let updateData = {};

    if (body?.first_name !== undefined) {
      updateData.first_name = body.first_name;
    }
    if (body?.last_name !== undefined) {
      updateData.last_name = body.last_name;
    }
    if (!!files?.length) {
      updateData.photo = JSON.stringify({
        name: files?.[0]?.originalname,
        url: !!files?.[0]?.path
          ? extractUploadPath(files?.[0]?.path)
          : files?.[0]?.location,
      });
    }

    if (Object.keys(updateData).length > 0) {
      await knex("nodestation_users")
        .where({ id: req?.user?.id })
        .update(updateData);
    }

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export { getUserMe, updateUserMe, checkIsAdmin };
