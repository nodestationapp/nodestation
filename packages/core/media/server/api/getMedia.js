import { knex } from "@nstation/db";

export default async (req, res) => {
  try {
    const settings = await knex("nodestation_media_settings")
      .first()
      .jsonParser();

    const media = await knex("nodestation_media").orderBy("created_at", "desc");

    media.forEach((item) => {
      item.url =
        settings?.active === "local"
          ? `${process.env.PUBLIC_URL}${item.url}`
          : item.url;
    });

    return res.status(200).json(media);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
