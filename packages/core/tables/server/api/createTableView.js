import { knex, singleJsonStringify } from "@nstation/db";

export default async (req, res) => {
  const { name, table, view } = req?.body;

  try {
    let preferences = await knex("nodestation_preferences")
      .where({
        id: view,
        table_id: table,
      })
      .first()
      .jsonParser();

    const createPreference = await knex("nodestation_preferences")
      .insert({
        name,
        uid: req?.user?.id,
        table_id: table,
        visibility: !!preferences?.visibility
          ? singleJsonStringify(preferences?.visibility)
          : null,
        order: !!preferences?.order
          ? singleJsonStringify(preferences?.order)
          : null,
        content: !!preferences?.content
          ? singleJsonStringify(preferences?.content)
          : null,
      })
      .returning("id");

    return res.status(200).json({ id: createPreference?.[0]?.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
