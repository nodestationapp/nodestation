import { knex, singleJsonStringify } from "@nstation/db";

export default async (req, res) => {
  const body = req?.body;

  try {
    const currentDate = Date.now();

    if (
      !!body?.hasOwnProperty("content") ||
      !!body?.hasOwnProperty("visibility")
    ) {
      let preference = await knex("nodestation_preferences")
        .where({
          id: body?.view,
        })
        .first()
        .returning("content")
        .jsonParser();

      const content = { ...preference?.content, ...body?.content };

      await knex("nodestation_preferences")
        .where({
          table_id: body?.table_id,
        })
        .update({
          uid: req?.user?.id,
          ...(!!body?.hasOwnProperty("visibility")
            ? {
                visibility: singleJsonStringify(body?.visibility),
              }
            : {}),
          ...(!!body?.hasOwnProperty("content")
            ? {
                content: singleJsonStringify(content),
              }
            : {}),
          updated_at: currentDate,
        });
    } else {
      await knex("nodestation_preferences")
        .where({
          id: body?.view,
        })
        .update({
          uid: req?.user?.id,
          ...(!!body?.hasOwnProperty("sort")
            ? {
                sort: singleJsonStringify(body?.sort),
              }
            : {}),
          ...(!!body?.hasOwnProperty("filters")
            ? {
                filters: singleJsonStringify(body?.filters),
              }
            : {}),
          updated_at: currentDate,
        });
    }

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

//TODO: Add order to the preferences
