import { fs } from "@nstation/utils";

const populateRelations = (query, table) => {
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

  return query;
};

export default populateRelations;
