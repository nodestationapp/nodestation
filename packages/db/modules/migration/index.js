import knex from "../knex.js";
import { fs } from "../../../utils/index.js";

const typesMap = {
  uuid: "uuid",
  short_text: "string",
  long_text: "text",
  enumeration: "string",
  media: "json",
  numeric: "integer",
  json: "json",
  boolean: "boolean",
  date: "integer",
};

function createOrModifyColumn({ table, item, dbColumns }) {
  let column;

  const type = typesMap[item?.type];

  column = table?.[type]?.(item?.slug);

  if (!!item?.primary_key) {
    column.primary();
  }

  if (item?.default !== undefined) {
    if (item?.default === "generate_uuid()") {
      column.defaultTo(knex.fn.uuid());
    } else {
      column.defaultTo(item?.default);
    }
  }

  if (!!dbColumns?.[item?.slug]) {
    column.alter();
  }

  return column;
}

export default async () => {
  const files = fs.getFiles();
  const tables = fs.getFiles(["tables"]);
  const auth = files?.find((item) => item?.id?.toString() === "auth");

  let formatted_auth = {
    ...auth,
    slug: "nodestation_users",
  };

  let all_tables = [...tables, formatted_auth];

  for await (const item of all_tables) {
    const fileColumns = item?.fields;
    const dbColumns = await knex(item?.slug).columnInfo();

    //ADD OR MODIFY
    const hasTable = await knex.schema.hasTable(item?.slug);

    await knex.schema?.[!!hasTable ? "alterTable" : "createTable"]?.(
      item?.slug,
      (table) => {
        for (const item of fileColumns) {
          createOrModifyColumn({ table, item, dbColumns });
        }
      }
    );

    //REMOVE
    const columnsToRemove = Object.keys(dbColumns).filter(
      (col) => !fileColumns.find((item) => item?.slug === col)
    );

    if (columnsToRemove.length > 0) {
      await knex.schema.alterTable(item?.slug, (table) => {
        columnsToRemove.forEach((col) => {
          table.dropColumn(col);
        });
      });
    }
  }
};
