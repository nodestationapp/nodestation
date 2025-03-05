import { knex } from "@nstation/db";

const safeJSONStringify = (input) => {
  try {
    return JSON.stringify(input);
  } catch (error) {
    return input;
  }
};

const safeJSONParse = (input) => {
  try {
    return JSON.parse(input);
  } catch (error) {
    return input;
  }
};
const parseJSONFields = (array) => {
  return array.map((item) => {
    return Object.fromEntries(
      Object.entries(item).map(([key, value]) => {
        const parsedValue = safeJSONParse(value);
        return [key, parsedValue];
      })
    );
  });
};

const getPreferences = async (req, res) => {
  try {
    let preferences = await knex("nodestation_preferences").select();

    preferences = parseJSONFields(preferences);

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
      .where({ table_id: body?.table_id, id: body?.view })
      .first();

    if (!!preference) {
      preference = safeJSONParse(preference?.content);

      const content = { ...preference, ...body?.content };

      await knex("nodestation_preferences")
        .where({
          id: body?.view,
          table_id: body?.table_id,
        })
        .update({
          uid: req?.user?.id,
          ...(!!body?.hasOwnProperty("sort")
            ? {
                sort: safeJSONStringify(body?.sort),
              }
            : {}),
          ...(!!body?.hasOwnProperty("order")
            ? {
                order: safeJSONStringify(body?.order),
              }
            : {}),
          ...(!!body?.hasOwnProperty("visibility")
            ? {
                visibility: safeJSONStringify(body?.visibility),
              }
            : {}),
          ...(!!body?.hasOwnProperty("filters")
            ? {
                filters: safeJSONStringify(body?.filters),
              }
            : {}),
          ...(!!body?.hasOwnProperty("filtersToggle")
            ? {
                filtersToggle: safeJSONStringify(body?.filtersToggle),
              }
            : {}),

          content: safeJSONStringify(content),
          updated_at: currentDate,
        });
    } else {
      await knex("nodestation_preferences").insert({
        uid: req?.user?.id,
        table_id: body?.table_id,
        content: safeJSONStringify(body?.content),
        ...(!!body?.hasOwnProperty("sort")
          ? {
              sort: safeJSONStringify(body?.sort),
            }
          : {}),
        ...(!!body?.hasOwnProperty("order")
          ? {
              order: safeJSONStringify(body?.order),
            }
          : {}),
        ...(!!body?.hasOwnProperty("visibility")
          ? {
              visibility: safeJSONStringify(body?.visibility),
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
    let preferences = await knex("nodestation_preferences").where({
      id: view,
      table_id: table,
    });

    preferences = parseJSONFields(preferences)?.[0];

    const createPreference = await knex("nodestation_preferences")
      .insert({
        name,
        uid: req?.user?.id,
        table_id: table,
        visibility: !!preferences?.visibility
          ? JSON.stringify(preferences?.visibility)
          : null,
        order: !!preferences?.order ? JSON.stringify(preferences?.order) : null,
        content: !!preferences?.content
          ? JSON.stringify(preferences?.content)
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
