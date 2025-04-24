import { knex, singleJsonStringify } from "@nstation/db";

const getPreferences = async (req, res) => {
  try {
    let preferences = await knex("nodestation_preferences")
      .select()
      .jsonParser();

    return res.status(200).json(preferences);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const upsertPreferences = async (req, res) => {
  const body = req?.body;

  if (!!!body?.table_id) {
    return res.status(200).json({ status: "ok" });
  }

  try {
    const currentDate = Date.now();

    let preference = await knex("nodestation_preferences")
      .where({
        table_id: body?.table_id,
        ...(!!body?.view ? { id: body?.view } : {}),
      })
      .first()
      .jsonParser();

    if (!!preference) {
      const content = { ...preference?.content, ...body?.content };

      await knex("nodestation_preferences")
        .where({
          ...(!!body?.view ? { id: body?.view } : {}),
          table_id: body?.table_id,
        })
        .update({
          uid: req?.user?.id,
          ...(!!body?.hasOwnProperty("sort")
            ? {
                sort: singleJsonStringify(body?.sort),
              }
            : {}),
          ...(!!body?.hasOwnProperty("order")
            ? {
                order: singleJsonStringify(body?.order),
              }
            : {}),
          ...(!!body?.hasOwnProperty("visibility")
            ? {
                visibility: singleJsonStringify(body?.visibility),
              }
            : {}),
          ...(!!body?.hasOwnProperty("filters")
            ? {
                filters: singleJsonStringify(body?.filters),
              }
            : {}),
          ...(!!body?.hasOwnProperty("filtersToggle")
            ? {
                filtersToggle: singleJsonStringify(body?.filtersToggle),
              }
            : {}),
          content: singleJsonStringify(content),
          updated_at: currentDate,
        });
    } else {
      await knex("nodestation_preferences").insert({
        uid: req?.user?.id,
        table_id: body?.table_id,
        content: singleJsonStringify(body?.content),
        ...(!!body?.hasOwnProperty("sort")
          ? {
              sort: singleJsonStringify(body?.sort),
            }
          : {}),
        ...(!!body?.hasOwnProperty("order")
          ? {
              order: singleJsonStringify(body?.order),
            }
          : {}),
        ...(!!body?.hasOwnProperty("visibility")
          ? {
              visibility: singleJsonStringify(body?.visibility),
            }
          : {}),
        created_at: currentDate,
      });
    }

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const createTableView = async (req, res) => {
  const { name, table, view } = req?.body;

  try {
    let preferences = await knex("nodestation_preferences")
      .where({
        id: view,
        table_id: table,
      })
      .first()
      .jsonParser();

    const createPreference = await knex("nodestation_preferences")
      .insert({
        name,
        uid: req?.user?.id,
        table_id: table,
        visibility: !!preferences?.visibility
          ? singleJsonStringify(preferences?.visibility)
          : null,
        order: !!preferences?.order
          ? singleJsonStringify(preferences?.order)
          : null,
        content: !!preferences?.content
          ? singleJsonStringify(preferences?.content)
          : null,
      })
      .returning("id");

    return res.status(200).json({ id: createPreference?.[0]?.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const updateTableView = async (req, res) => {
  const { id } = req?.params;
  const { name } = req?.body;

  try {
    await knex("nodestation_preferences")
      .where({
        id,
      })
      .update({
        name,
      });

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const removeTableView = async (req, res) => {
  const { id } = req?.params;

  try {
    await knex("nodestation_preferences")
      .where({
        id,
      })
      .del();

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export {
  getPreferences,
  upsertPreferences,
  createTableView,
  updateTableView,
  removeTableView,
};
