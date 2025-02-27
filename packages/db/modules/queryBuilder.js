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

function processObjects(objects, settings) {
  return objects.map((obj) => {
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === "object" && obj[key].photo) {
        try {
          let photo = JSON.parse(obj[key].photo);
          obj[key].photo = {
            ...photo,
            url:
              settings?.active === "local"
                ? `${process.env.PUBLIC_URL}${photo.url}`
                : photo.url,
          };
        } catch (e) {
          console.error("Invalid JSON in photo field", e);
          obj[key].photo = null;
        }
      }
    }
    return obj;
  });
}

export default async ({ table, filters, sort, pagination }) => {
  let query = knex(table?.slug);

  if (!!filters) {
    query = query.modify(applyFilters, filters, table?.fields);
  }

  if (!!pagination) {
    query = query
      .limit(pagination.pageSize)
      .offset((pagination.page - 1) * pagination.pageSize);
  }

  if (!!sort) {
    query = query.orderBy(sort?.[0], sort?.[1]);
  }

  let is_user_type = false;

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

      is_user_type = true;
    }
  });

  if (!!is_user_type) {
    const settings = await knex("nodestation_media_settings").first();

    query = query.then((items) => {
      let formatted_items = transformData(items);
      formatted_items = processObjects(formatted_items, settings);
      return formatted_items;
    });
  }

  return query;
};
