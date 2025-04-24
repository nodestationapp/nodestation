/**
 * @status active
 * @parser raw
 * @middlewares []
 * @auth []
 */

// import slugify from "slugify";
import { fs } from "@nstation/utils";
import { knex, queryBuilder } from "@nstation/db";

const table_id = "nodestation_users";

export default async (req, res) => {
  let { view, type, ...rest } = req?.query || {};

  try {
    let views = await knex("nodestation_preferences")
      .where({
        table_id,
      })
      .orderBy("created_at", "asc");

    let preferences;

    if (!!view) {
      preferences = await knex("nodestation_preferences")
        .where({
          id: view,
        })
        .first()
        .jsonParser();

      await knex("nodestation_preferences")
        .where({
          table_id: table_id,
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

    const table = fs.getSchema(table_id);
    table.id = table.tableName;

    const filters = [
      ...(preferences?.filters || []),
      ...Object.keys(rest)?.map((item) => ({
        field: item,
        value: req?.query?.[item],
      })),
    ];

    const entries = await queryBuilder({
      table,
      filters,
      sort: preferences?.sort?.[0],
    });

    return res.status(200).json({
      table,
      entries,
      preferences,
      views,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
