import { knex } from "@nstation/db";

export default async (req, res) => {
  let body = req?.body;

  try {
    const current_setting = await knex("nodestation_logger_settings")
      .where("key", body.key)
      .first();

    if (!current_setting) {
      await knex("nodestation_logger_settings").insert({
        key: body.key,
        body: body.body || null,
        active: 0,
      });
    } else {
      await knex("nodestation_logger_settings")
        .where("key", body.key)
        .update({
          ...(!!body?.hasOwnProperty("body")
            ? {
                body: body.body,
              }
            : {}),
          ...(!!body?.hasOwnProperty("active")
            ? {
                active: !!body.body ? body.active : 0,
              }
            : {}),
        });
    }

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
