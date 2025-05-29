import { knex } from "@nstation/db";

export default async (req, res) => {
  try {
    let preferences = await knex("nodestation_preferences")
      .select()
      .orderBy("created_at", "asc")
      .jsonParser();

    return res.status(200).json(preferences);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
