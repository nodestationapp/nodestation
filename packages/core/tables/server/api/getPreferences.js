import { knex } from "@nstation/db";

export default async (req, res) => {
  try {
    const { id } = req.params;

    let preferences = await knex("nodestation_preferences")
      .where({ table_id: id })
      .select()
      .jsonParser();

    if (!preferences?.length) {
      preferences = await knex("nodestation_preferences")
        .insert({
          name: "Entries",
          table_id: id,
          last_viewed: 1,
        })
        .returning("*");
    }

    return res.status(200).json(preferences);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
