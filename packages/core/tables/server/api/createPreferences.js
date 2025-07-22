import { knex } from "@nstation/db";

export default async (req, res) => {
  const { table_id, name } = req?.body;

  try {
    const create = await knex("nodestation_preferences")
      .insert({
        uid: req?.user?.id,
        table_id,
        name,
      })
      .returning("id");

    return res.status(200).json({ id: create?.[0]?.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

//TODO: Add order to the preferences
