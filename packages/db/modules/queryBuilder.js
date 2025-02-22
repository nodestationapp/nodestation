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

        transformedItem[parent][nestedKey] = value;
      } else {
        if (!!value) {
          transformedItem[key] = value;
        }
      }
    }

    return transformedItem;
  });
}

export default async ({ table, filters, sort }) => {
  let query = knex(table?.slug);

  if (!!filters) {
    query = query.modify(applyFilters, filters, table?.fields);
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
          `nodestation_users.id as profile.id`,
          `nodestation_users.first_name as profile.first_name`,
          `nodestation_users.last_name as profile.last_name`,
          `nodestation_users.photo as profile.photo`
        );

      is_user_type = true;
    }
  });

  if (!!is_user_type) {
    const settings = await knex("nodestation_media_settings").first();

    query = query.then((items) => {
      const formatted_items = transformData(items);

      return formatted_items.map((item) => {
        const photo = !!item?.profile?.photo
          ? JSON.parse(item?.profile?.photo)
          : null;

        return {
          ...item,
          profile: !!item?.profile?.id
            ? {
                ...item?.profile,
                photo: !!photo
                  ? {
                      ...photo,
                      url:
                        settings?.active === "local"
                          ? `${process.env.PUBLIC_URL}${photo?.url}`
                          : photo?.url,
                    }
                  : null,
              }
            : null,
        };
      });
    });
  }

  return query;
};
