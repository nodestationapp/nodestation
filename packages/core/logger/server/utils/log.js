import { knex } from "@nstation/db";

export default async (data) => {
  try {
    await knex("nodestation_logger")
      .insert(data)
      .catch((err) => console.error(err));
  } catch (err) {
    console.error(err);
  }

  return true;
};
