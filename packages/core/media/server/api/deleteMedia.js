import { knex } from "@nstation/db";
import removeUploadedFile from "../utils/removeUploadedFile/index.js";

export default async (req, res) => {
  try {
    const { id } = req.params;

    const media_query = await knex("nodestation_media")
      .where({ id })
      .select("url")
      .first();

    const deleteFile = await removeUploadedFile(media_query?.url);

    if (!!deleteFile) {
      await knex("nodestation_media").where({ id }).del();
    }

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
