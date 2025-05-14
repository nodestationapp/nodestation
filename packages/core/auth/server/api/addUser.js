import bcrypt from "bcryptjs";

import upsertEntry from "../../../tables/server/utils/upsertEntry.js";
import { knex } from "@nstation/db";

export default async (req, res) => {
  let body = req?.body;

  try {
    const user = await knex("nodestation_users")
      .where({
        id: body?.id,
      })
      .first();

    if (user?.password !== body?.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body?.password, salt);
      body.password = hashedPassword;
    }

    body.photo = body?.photo?.id || body?.photo;

    await upsertEntry({
      id: "nodestation_users",
      body,
      entry_id: body?.id,
    });

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
