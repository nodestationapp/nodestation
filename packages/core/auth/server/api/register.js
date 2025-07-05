import { knex } from "@nstation/db";
import register from "../../utils/register.js";

export default async (req, res) => {
  let body = req?.body;

  try {
    const usersCount = await knex("nodestation_users")
      .where({
        type: "superadmin",
      })
      .count("* as count")
      .then((row) => row.count);

    if (!!!usersCount) {
      body.type = "superadmin";
    } else {
      if (body?.type === "superadmin") {
        return res.status(500).json({ error: "Something went wrong" });
      }
    }

    await register(body);

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
