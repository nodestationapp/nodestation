import { knex } from "@nstation/db";

export default async (req, res) => {
  const page = req?.query?.page || 0;
  const pageSize = req?.query?.pageSize || 24;
  let sort = req?.query?.sort || "created_at:desc";

  sort = sort?.split(":");
  sort = {
    field: sort?.[0],
    sort: sort?.[1],
  };

  try {
    const settings = await knex("nodestation_media_settings")
      .first()
      .jsonParser();

    const media = await knex("nodestation_media")
      .orderBy(sort?.field, sort?.sort)
      .limit(pageSize)
      .offset(page * pageSize);

    const [{ count }] = await knex("nodestation_media").count("* as count");

    media.forEach((item) => {
      item.url =
        settings?.active === "local"
          ? `${process.env.PUBLIC_URL}${item.url}`
          : item.url;
    });

    return res.status(200).json({
      count,
      data: media,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
