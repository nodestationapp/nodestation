import { knex } from "@nstation/db";

export default async (req, res) => {
  try {
    let providersCount = await knex("nodestation_email_providers").count();

    return res
      .status(200)
      .json({ providers_count: providersCount?.[0]?.count });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
