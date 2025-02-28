import { fs } from "@nstation/utils";
import knex from "./knex.js";
import applyFilters from "./utils/applyFilters.js";

function transformData(data) {
  return data.map((item) => {
    const transformedItem = {};

    for (const [key, value] of Object.entries(item)) {
      if (key.includes(".")) {
        const keys = key.split(".");
        const parent = keys.shift();
        const nestedKey = keys.join(".");

        if (typeof transformedItem[parent] !== "object") {
          transformedItem[parent] = {};
        }

        if (!!item?.[`${parent}.id`]) {
          transformedItem[parent][nestedKey] = value;
        } else {
          transformedItem[parent] = null;
        }
      } else {
        transformedItem[key] = value;
      }
    }

    return transformedItem;
  });
}

function mediaParser(fields, objects, settings) {
  return objects.map((obj) => {
    for (const key in obj) {
      const type = fields?.find((item) => item?.slug === key)?.type;

      if (type === "media") {
        try {
          let media = JSON.parse(obj[key]);
          obj[key] = {
            ...media,
            url:
              settings?.active === "local"
                ? `${process.env.PUBLIC_URL}${media.url}`
                : media.url,
          };
        } catch (e) {
          obj[key] = null;
        }
      }
    }
    return obj;
  });
}

export default async ({ table, filters, sort, pagination }) => {
  let query = knex(table?.slug);

  if (!!filters) {
    query = query.modify(applyFilters, filters, table);
  }

  if (!!pagination) {
    query = query
      .limit(pagination.pageSize)
      .offset((pagination.page - 1) * pagination.pageSize);
  }

  if (!!sort) {
    query = query.orderBy(sort?.[0], sort?.[1]);
  }

  table?.fields?.forEach((item) => {
    if (item?.type === "user") {
      query = query
        .leftJoin(
          "nodestation_users",
          `${table?.slug}.${item?.slug}`,
          "nodestation_users.id"
        )
        .select(
          `${table?.slug}.*`,
          `nodestation_users.id as ${item?.slug}.id`,
          `nodestation_users.first_name as ${item?.slug}.first_name`,
          `nodestation_users.last_name as ${item?.slug}.last_name`,
          `nodestation_users.photo as ${item?.slug}.photo`
        );
    }

    if (!!item?.relation) {
      const tables = fs.getFiles(["tables"]);
      const ref_table = tables?.find(
        (element) => element?.id?.toString() === item?.relation
      );

      query = query
        .leftJoin(
          ref_table?.slug,
          `${table?.slug}.${item?.slug}`,
          `${ref_table?.slug}.id`
        )
        .select(
          `${table?.slug}.*`,
          `${ref_table?.slug}.id as ${item?.slug}.id`,
          `${ref_table?.slug}.${ref_table?.display_name} as ${item?.slug}.label`
        );
    }
  });

  const settings = await knex("nodestation_media_settings").first();

  query = query.then((items) => {
    let formatted_items = transformData(items);
    formatted_items = mediaParser(table?.fields, formatted_items, settings);
    return formatted_items;
  });

  return query;
};
