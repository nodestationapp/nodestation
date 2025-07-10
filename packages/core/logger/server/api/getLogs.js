import { knex, queryBuilder } from "@nstation/db";

export default async (req, res) => {
  let { page = 0, sort, filters, pageSize = 10 } = req?.query || {};

  if (sort) {
    sort = sort?.split(":");
    sort = {
      field: sort?.[0],
      sort: sort?.[1],
    };
  }

  if (filters) {
    filters = filters?.split(",");

    filters = filters
      ?.map((item) => {
        item = item?.split(":");
        return { field: item?.[0], operator: item?.[1], value: item?.[2] };
      })
      ?.filter((item) => item?.value !== "undefined");
  }

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
            name: "Label",
            slug: "label",
            type: "text",
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
      sort,
      filters,
      pagination: { page, pageSize },
    });

    return res.status(200).json({
      items: data,
      preferences,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
