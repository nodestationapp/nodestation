import { knex } from "@nstation/db";

export default async (req, res) => {
  try {
    let settings = await knex("nodestation_media_settings").first();

    if (!settings) {
      settings = await knex("nodestation_media_settings")
        .insert({ active: "local" })
        .returning("*")
        .then((data) => data[0]);
    }

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
