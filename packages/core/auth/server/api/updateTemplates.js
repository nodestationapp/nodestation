import { knex } from "@nstation/db";

export default async (req, res) => {
  let body = req?.body;

  body.email_verification_template =
    body?.email_verification_template?.toString();
  body.forget_password_template = body?.forget_password_template?.toString();

  try {
    const settings = await knex("nodestation_users_settings").first();

    if (!settings) {
      await knex("nodestation_users_settings").insert(body);
    } else {
      await knex("nodestation_users_settings").first().update(body);
    }

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
