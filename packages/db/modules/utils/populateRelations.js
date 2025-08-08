import { fs } from "@nstation/utils";

const populateRelations = (query, table) => {
  table?.fields?.forEach((item, index) => {
    if (item?.type === "media") {
      query = query
        .leftJoin(
          { [`nodestation_media_${index}`]: "nodestation_media" },
          `${table?.tableName}.${item?.slug}`,
          `nodestation_media_${index}.id`
        )
        .select(
          `${table?.tableName}.*`,
          `nodestation_media_${index}.id as ${item?.slug}.id`,
          `nodestation_media_${index}.name as ${item?.slug}.name`,
          `nodestation_media_${index}.url as ${item?.slug}.url`
        );
    }

    if (item?.type === "user") {
      query = query
        .leftJoin(
          { [`nodestation_users_${index}`]: "nodestation_users" },
          `${table?.tableName}.${item?.slug}`,
          `nodestation_users_${index}.id`
        )
        .leftJoin(
          { [`user_photo_media_${index}`]: "nodestation_media" },
          `nodestation_users_${index}.photo`,
          `user_photo_media_${index}.id`
        )
        .select(
          `${table?.tableName}.*`,
          `nodestation_users_${index}.id as ${item?.slug}.id`,
          `nodestation_users_${index}.first_name as ${item?.slug}.first_name`,
          `nodestation_users_${index}.last_name as ${item?.slug}.last_name`,
          `user_photo_media_${index}.id as ${item?.slug}.photo.id`,
          `user_photo_media_${index}.name as ${item?.slug}.photo.name`,
          `user_photo_media_${index}.url as ${item?.slug}.photo.url`
        );
    }

    // if (item?.type === "relation") {
    //   const schema = fs.getSchema(item?.relation?.table);

    //   query = query
    //     .leftJoin(
    //       schema?.tableName,
    //       `${table?.tableName}.${item?.slug}`,
    //       `${schema?.tableName}.id`
    //     )
    //     .select(
    //       `${table?.tableName}.*`,
    //       `${schema?.tableName}.id as ${item?.slug}.id`,
    //       `${schema?.tableName}.${schema?.displayName} as ${item?.slug}.${schema?.displayName}`
    //     );
    // }
  });

  return query;
};

export default populateRelations;
