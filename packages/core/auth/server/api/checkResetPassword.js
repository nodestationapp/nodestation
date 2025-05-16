import { knex } from "@nstation/db";

export default async (req, res) => {
  const { token } = req?.query;

  try {
    if (!!req.user) throw new Error();

    const check_password_reset = await knex(
      "nodestation_users_password_reset"
    ).where({
      id: token,
    });

    if (!!!check_password_reset?.length) throw new Error();

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
