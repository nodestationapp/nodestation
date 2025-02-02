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
      .where({ table_id: body?.table_id })
      .first();

    if (!!preference) {
      preference = safeJSONParse(preference?.content);

      const content = { ...preference, ...body?.content };

      await knex("nodestation_preferences")
        .where({
          table_id: body?.table_id,
        })

        .update({
          uid: req?.user?.id,
          ...(!!body?.hasOwnProperty("sort")
            ? {
                sort: safeJSONStringify(body?.sort),
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
        created_at: currentDate,
      });
    }

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export { getPreferences, upsertPreferences };
