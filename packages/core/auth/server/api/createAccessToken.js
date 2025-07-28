import jwt from "jsonwebtoken";
import { knex } from "@nstation/db";

const getExpiration = (expiration) => {
  switch (expiration) {
    case "7":
      return "7d";
    case "30":
      return "30d";
    case "90":
      return "90d";
    default:
      return undefined;
  }
};

export default async (req, res) => {
  const body = req.body;
  const expiration = getExpiration(body?.expiration);

  try {
    const superadmin = await knex("nodestation_users")
      .where({
        type: "superadmin",
      })
      .first();

    const access_token = jwt.sign(
      { id: superadmin.id },
      process.env.TOKEN_SECRET,
      expiration ? { expiresIn: expiration } : {}
    );

    await knex("nodestation_users_api_tokens").insert({
      name: body?.name,
      token: access_token,
    });

    return res.status(200).json({ access_token });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
