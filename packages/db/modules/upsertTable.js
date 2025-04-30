import knex from "./knex.js";
import createPreferencesIfNotExist from "./createPreferencesIfNotExist.js";

const typesMap = {
  id: "string",
  text: "text",
  password: "string",
  select: "string",
  media: process.env.DATABASE_CLIENT === "sqlite" ? "text" : "jsonb",
  numeric: "integer",
  json: process.env.DATABASE_CLIENT === "sqlite" ? "text" : "jsonb",
  boolean: "integer",
  date: "string",
  user: "string",
};

function createOrModifyColumn({ table, schema, dbColumns }) {
  let column;

  const type = typesMap[schema?.type];

  column = table?.[type]?.(schema?.slug);

  if (!!schema?.primary_key) {
    column.primary();
  }

  if (!!dbColumns?.[schema?.slug]) {
    column.alter();
  }

  if (!!schema?.default) {
    if (schema?.default === "generate_id()") {
      column.defaultTo(knex.fn.uuid());
    }

    if (schema?.default === true) {
      column.defaultTo(1);
    }

    if (schema?.default === false) {
      column.defaultTo(0);
    }

    if (schema?.default === "now()") {
      if (knex.client.config.client === "pg") {
        column.defaultTo(knex.raw("EXTRACT(EPOCH FROM NOW())::BIGINT"));
      } else {
        column.defaultTo(knex.raw("(strftime('%s', 'now') * 1)"));
      }
    }
  }

  return column;
}

export default async (table) => {
  let fileColumns = table?.fields;
  let dbColumns = await knex(table?.tableName).columnInfo();

  const hasTable = await knex.schema.hasTable(table?.tableName);

  if (!!hasTable) {
    fileColumns = fileColumns.filter((item) => item?.primary_key !== true);
    delete dbColumns["id"];
  }

  await knex.schema?.[!!hasTable ? "alterTable" : "createTable"]?.(
    table?.tableName,
    (table) => {
      for (const schema of fileColumns) {
        createOrModifyColumn({ table, schema, dbColumns });
      }
    }
  );

  const columnsToRemove = Object.keys(dbColumns).filter(
    (col) => !fileColumns.find((item) => item?.slug === col)
  );

  if (columnsToRemove.length > 0) {
    await knex.schema.alterTable(table?.tableName, (table) => {
      columnsToRemove.forEach((col) => {
        table.dropColumn(col);
      });
    });
  }

  await createPreferencesIfNotExist(table?.tableName);
};
