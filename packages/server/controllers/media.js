import fs from "fs";
import path from "path";
import { knex } from "@nstation/db";
import { rootPath } from "@nstation/utils";

function extractUploadPath(fullPath) {
  const uploadIndex = fullPath.indexOf("/uploads/");
  if (uploadIndex !== -1) {
    return fullPath.substring(uploadIndex);
  }
  return null;
}

const getMedia = async (_, res) => {
  try {
    const data = await knex("nodestation_media").select();
    const settings = await knex("nodestation_media_settings").first();

    const formatted_data = data?.map((item) => ({
      ...item,
      url:
        settings?.active === "local"
          ? `${process.env.PUBLIC_URL}${item?.url}`
          : item?.url,
    }));

    return res.status(200).json(formatted_data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const addMedia = async (req, res) => {
  const files = req?.files;

  try {
    for await (const file of files) {
      const created_at = Date.now();
      const upload_path = !!file?.path
        ? extractUploadPath(file?.path)
        : file?.location;

      await knex("nodestation_media").insert({
        name: file?.originalname,
        size: file?.size,
        type: file?.mimetype,
        url: upload_path,
        created_at,
      });
    }

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const removeMedia = async (req, res) => {
  const { id } = req?.params;

  try {
    const media_query = await knex("nodestation_media")
      .where({ id: parseInt(id) })
      .select("url")
      .first();

    fs.rmSync(path.join(rootPath, media_query?.url), {
      recursive: true,
      force: true,
    });

    const folderPath = path.join(rootPath, path.dirname(media_query?.url));

    if (fs.existsSync(folderPath) && fs.readdirSync(folderPath).length === 0) {
      fs.rmdirSync(folderPath);
    }

    await knex("nodestation_media")
      .where({ id: parseInt(id) })
      .del();

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getMediaSettings = async (_, res) => {
  try {
    let settings = await knex("nodestation_media_settings").first();

    const formatted_settings = Object.fromEntries(
      Object.entries(settings).map(([key, value]) => {
        if (value) {
          try {
            return [key, JSON.parse(value)];
          } catch {
            return [key, value];
          }
        }
        return [key, value];
      })
    );

    return res.status(200).json(formatted_settings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const updateMediaSettings = async (req, res) => {
  let body = req?.body;

  try {
    const formatted_body = Object.keys(body).reduce((acc, key) => {
      acc[key] = key !== "active" ? JSON.stringify(body[key]) : body[key];
      return acc;
    }, {});

    await knex("nodestation_media_settings").first().update(formatted_body);

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export {
  getMedia,
  addMedia,
  removeMedia,
  getMediaSettings,
  updateMediaSettings,
};
