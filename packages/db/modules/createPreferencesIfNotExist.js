import { knex } from "@nstation/db";

export default async (table) => {
  try {
    let preferences = await knex("nodestation_preferences")
      .where({
        table_id: table,
      })
      .count("* as count")
      .first()
      .then((row) => row?.count);

    if (!!!preferences) {
      await knex("nodestation_preferences").insert({
        name: "Entries",
        table_id: table,
      });
    }
  } catch (err) {
    console.error(err);
  }
};
