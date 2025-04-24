import { knex } from "@nstation/db";

export default async (req, res) => {
  try {
    const count = await knex("nodestation_users")
      .where({
        type: "admin",
        status: "active",
      })
      .count("* as count")
      .first()
      .then((row) => row.count);

    return res.status(200).json({ is_admin: !!count });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
