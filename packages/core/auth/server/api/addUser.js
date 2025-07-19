import bcrypt from "bcryptjs";

import upsertEntry from "@nstation/tables/server/utils/upsertEntry.js";
import { knex } from "@nstation/db";

export default async (req, res) => {
  let body = req?.body;

  try {
    let user;

    if (body?.id) {
      user = await knex("nodestation_users")
        .where({
          id: body?.id,
        })
        .first();
    } else {
      const userExist = await knex("nodestation_users")
        .where({
          email: body?.email,
        })
        .first();

      if (!!userExist) {
        return res.status(400).json({ error: "User already exists" });
      }
    }

    if (!body?.id || user?.password !== body?.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body?.password, salt);
    }

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
