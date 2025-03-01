import { knex, queryBuilder } from "@nstation/db";

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

const getLogs = async (req, res) => {
  const pageSize = 50;
  const { page = 1 } = req?.query;

  try {
    let preferences = await knex("nodestation_preferences").where({
      table_id: "nodestation_logs",
    });
    preferences = parseJSONFields(preferences)?.[0];

    const data = await queryBuilder({
      table: {
        slug: "nodestation_logs",
        fields: [
          {
            name: "Level",
            slug: "level",
            type: "select",
          },
          {
            name: "Method",
            slug: "method",
            type: "select",
          },
          {
            name: "Status",
            slug: "status",
            type: "text",
          },
          {
            name: "Url",
            slug: "url",
            type: "text",
          },
          {
            name: "Created at",
            slug: "created_at",
            type: "date",
          },
        ],
      },
      sort: { id: "created_at", desc: true },
      filters: preferences?.filters,
      pagination: {
        pageSize,
        page,
      },
    });

    const totalItems = await knex("nodestation_logs")
      .count("id as count")
      .first();
    const hasNextPage = page * pageSize < totalItems.count;

    return res.status(200).json({
      items: data,
      nextPage: !!hasNextPage ? parseInt(req?.query?.page) + 1 : null,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const logsReadAll = async (req, res) => {
  try {
    await knex("nodestation_logs").where({ is_read: 0 }).update({ is_read: 1 });

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export { getLogs, logsReadAll };
