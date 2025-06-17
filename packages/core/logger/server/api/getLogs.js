import { knex, queryBuilder } from "@nstation/db";

export default async (req, res) => {
  const pageSize = 50;
  const { page = 0 } = req?.query;

  try {
    let preferences = await knex("nodestation_preferences")
      .where({
        table_id: "nodestation_logger",
      })
      .first()
      .jsonParser();

    const data = await queryBuilder({
      table: {
        tableName: "nodestation_logger",
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
      sort: { field: "created_at", sort: "desc" },
      filters: preferences?.filters,
      pagination: {
        pageSize,
        page,
      },
    });

    const totalItems = await knex("nodestation_logger")
      .count("id as count")
      .first();
    const hasNextPage = page * pageSize < totalItems.count;

    return res.status(200).json({
      items: data,
      preferences,
      nextPage: !!hasNextPage ? parseInt(req?.query?.page) + 1 : null,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
