import knex from "../knex.js";
import { fs } from "../../../utils/index.js";
import createPreferencesIfNotExist from "../createPreferencesIfNotExist.js";

const typesMap = {
  id: "string",
  text: "text",
  select: "string",
  varchar: "string",
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
    } else if (schema?.default === true) {
      column.defaultTo(1);
    } else if (schema?.default === false) {
      column.defaultTo(0);
    } else if (schema?.default === "now()") {
      if (knex.client.config.client === "pg") {
        column.defaultTo(knex.raw("EXTRACT(EPOCH FROM NOW())::BIGINT"));
      } else {
        column.defaultTo(knex.raw("(strftime('%s', 'now') * 1)"));
      }
    } else {
      column.defaultTo(schema?.default);
    }
  }

  return column;
}

export default async () => {
  const tables = fs.getFiles(["/src/schemas/tables/**/*.json"]);

  for await (const item of tables) {
    let fileColumns = item?.fields;
    let dbColumns = await knex(item?.id).columnInfo();

    //ADD OR MODIFY
    const hasTable = await knex.schema.hasTable(item?.id);

    if (!!hasTable) {
      fileColumns = fileColumns.filter((item) => item?.primary_key !== true);
      delete dbColumns["id"];
    }

    await knex.schema?.[!!hasTable ? "alterTable" : "createTable"]?.(
      item?.id,
      (table) => {
        for (const schema of fileColumns) {
          createOrModifyColumn({ table, schema, dbColumns });
        }
      }
    );

    //REMOVE
    const columnsToRemove = Object.keys(dbColumns).filter(
      (col) => !fileColumns.find((item) => item?.slug === col)
    );

    if (columnsToRemove.length > 0) {
      await knex.schema.alterTable(item?.id, (table) => {
        columnsToRemove.forEach((col) => {
          table.dropColumn(col);
        });
      });
    }

    await createPreferencesIfNotExist(item?.id);
  }
};
