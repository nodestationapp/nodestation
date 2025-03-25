import knex from "./knex.js";
import { fs } from "@nstation/utils";

import mediaParser from "./utils/mediaParser.js";
import applyFilters from "./utils/applyFilters.js";
import transformRelations from "./utils/transformRelations.js";

export default async ({ table, filters, sort, pagination }) => {
  let query = knex(table?.id === "auth" ? "nodestation_users" : table?.id);

  if (!!filters) {
    query = query.modify(applyFilters, filters, table);
  }

  if (!!pagination) {
    query = query
      .limit(pagination.pageSize)
      .offset((pagination.page - 1) * pagination.pageSize);
  }

  if (!!sort) {
    const field = sort?.id;
    const method = sort?.desc ? "desc" : "asc";

    query = query.orderBy(field, method);
  }

  table?.fields?.forEach((item) => {
    if (item?.type === "user") {
      query = query
        .leftJoin(
          "nodestation_users",
          `${table?.id}.${item?.slug}`,
          "nodestation_users.id"
        )
        .select(
          `${table?.id}.*`,
          `nodestation_users.id as ${item?.slug}.id`,
          `nodestation_users.first_name as ${item?.slug}.first_name`,
          `nodestation_users.last_name as ${item?.slug}.last_name`,
          `nodestation_users.photo as ${item?.slug}.photo`
        );
    }

    if (!!item?.relation) {
      const tables = fs.getFiles(`/src/schemas/tables/${item?.relation}.json`);
      const ref_table = tables?.[0];

      query = query
        .leftJoin(
          ref_table?.id,
          `${table?.id}.${item?.slug}`,
          `${ref_table?.id}.id`
        )
        .select(
          `${table?.id}.*`,
          `${ref_table?.id}.id as ${item?.slug}.id`,
          `${ref_table?.id}.${ref_table?.display_name} as ${item?.slug}.label`
        );
    }
  });

  const settings = await knex("nodestation_media_settings")
    .first()
    .jsonParser();

  query = query.jsonParser();

  query = query.then((items) => {
    let formatted_items = transformRelations(items, settings);
    formatted_items = mediaParser(table?.fields, formatted_items, settings);
    return formatted_items;
  });

  return query;
};
