import { knex } from "@nstation/db";

export default async (req, res) => {
  let body = req?.body;

  try {
    const formatted_body = Object.keys(body).reduce((acc, key) => {
      acc[key] = key !== "active" ? JSON.stringify(body[key]) : body[key];
      return acc;
    }, {});

    await knex("nodestation_email_settings").first().update(formatted_body);

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
