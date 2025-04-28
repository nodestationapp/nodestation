import { knex } from "@nstation/db";

export default async (req, res) => {
  const { id } = req?.params;

  try {
    await knex("nodestation_preferences")
      .where({
        id,
      })
      .del();

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
