import { fs } from "@nstation/utils";
import { knex } from "@nstation/db";

const getForms = async (_, res) => {
  try {
    const forms = fs.getFiles("/src/schemas/forms/**/*.json");

    let formatted_forms = [];
    for await (const item of forms) {
      const total_count = await knex(item?.id)
        .count("* as count")
        .first()
        .then((row) => row?.count);

      const unread_count = await knex(item?.id)
        .where({
          is_read: 0,
          archived: 0,
        })
        .count("* as count")
        .first()
        .then((row) => row.count);

      formatted_forms.push({
        ...item,
        total_count,
        unread_count,
      });
    }

    return res.status(200).json(formatted_forms);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export { getForms };
