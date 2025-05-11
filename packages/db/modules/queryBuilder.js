import knex from "./knex.js";

import mediaParser from "./utils/mediaParser.js";
import applyFilters from "./utils/applyFilters.js";
import populateRelations from "./utils/populateRelations.js";
import transformRelations from "./utils/transformRelations.js";

export default async ({ table, filters, sort, pagination }) => {
  const countQuery = knex(table?.tableName);
  if (filters) {
    countQuery.modify(applyFilters, filters, table);
  }
  const [{ count }] = await countQuery.clone().count("* as count");

  let query = knex(table?.tableName);

  if (!!filters) {
    query = query.modify(applyFilters, filters, table);
  }

  if (!!pagination) {
    query = query
      .limit(pagination.pageSize)
      .offset(pagination.page * pagination.pageSize);
  }

  if (!!sort) {
    query = query.orderBy(sort?.field, sort?.sort);
  }

  query = populateRelations(query, table);

  // const settings = await knex("nodestation_media_settings")
  //   .first()
  //   .jsonParser();

  query = query.jsonParser();

  // query = query.then((items) => {
  //   let formatted_items = transformRelations(items, settings);
  //   formatted_items = mediaParser(table?.fields, formatted_items, settings);

  //   return formatted_items;
  // });

  const items = await query;

  return {
    items,
    count,
  };
};
