import { knex } from "@nstation/db";

export default async (req, res) => {
  try {
    let settings = await knex("nodestation_logger_settings");

    return res.status(200).json(settings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
