import { knex } from "@nstation/db";

export default async (req, res) => {
  let { entry_id } = req?.params;
  const id = req?.route?.path?.split("/")?.[4];

  try {
    await knex(id).where({ id: entry_id }).del();

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
