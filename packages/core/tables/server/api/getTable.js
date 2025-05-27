import { fs } from "@nstation/utils";
import { knex, queryBuilder } from "@nstation/db";

export default async (req, res) => {
  const pageSize = 20;
  let { id } = req?.params;
  let { view, page = 0, sort, filters } = req?.query || {};

  if (sort) {
    sort = sort?.split(":");
    sort = {
      field: sort?.[0],
      sort: sort?.[1],
    };
  }

  if (filters) {
    filters = filters?.split(",");

    filters = filters?.map((item) => {
      item = item?.split(":");
      return { field: item?.[0], operator: item?.[1], value: item?.[2] };
    });
  }

  try {
    let views = await knex("nodestation_preferences")
      .where({
        table_id: id,
      })
      .orderBy("created_at", "asc");

    let preferences;

    if (!!!view) {
      preferences = await knex("nodestation_preferences")
        .where({
          table_id: id,
          last_viewed: 1,
        })
        .first()
        .jsonParser();

      if (!!!preferences) {
        preferences = await knex("nodestation_preferences")
          .insert({
            table_id: id,
            name: "Entries",
            uid: req?.user?.id,
            last_viewed: 1,
          })
          .returning("id");

        preferences = preferences?.[0];
      }
    } else {
      preferences = await knex("nodestation_preferences")
        .where({
          id: view,
        })
        .first()
        .jsonParser();

      await knex("nodestation_preferences")
        .where({
          table_id: id,
        })
        .update({
          last_viewed: null,
        });

      await knex("nodestation_preferences")
        .where({
          id: view,
        })
        .update({
          last_viewed: 1,
        });
    }

    const table = fs.getSchema(id);
    table.id = table.tableName;

    // const filters = [
    //   ...(preferences?.filters || []),
    //   ...Object.keys(rest)?.map((item) => ({
    //     field: item,
    //     value: req?.query?.[item],
    //   })),
    // ];

    const entries = await queryBuilder({
      table,
      filters,
      sort,
      pagination: { page, pageSize },
    });

    return res.status(200).json({
      table,
      entries: entries?.items,
      preferences,
      views,
      pagination: { page, pageSize, count: entries?.count },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
