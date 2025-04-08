import knex from "./knex.js";

import mediaParser from "./utils/mediaParser.js";
import applyFilters from "./utils/applyFilters.js";
import populateRelations from "./utils/populateRelations.js";
import transformRelations from "./utils/transformRelations.js";

export default async ({ table, filters, sort, pagination }) => {
  let query = knex(table?.tableName);

  if (!!filters) {
    query = query.modify(applyFilters, filters, table);
  }

  if (!!pagination) {
    query = query
      .limit(pagination.pageSize)
      .offset((pagination.page - 1) * pagination.pageSize);
  }

  if (!!sort) {
    query = query.orderBy(sort?.field, sort?.sort);
  }

  query = populateRelations(query, table);

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
