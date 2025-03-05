import knex from "../knex.js";
import { fs } from "../../../utils/index.js";
import createPreferencesIfNotExist from "../createPreferencesIfNotExist.js";

const typesMap = {
  id: "string",
  text: "text",
  select: "string",
  media: "text",
  numeric: "integer",
  json: "json",
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

export default async () => {
  const files = fs.getFiles();
  let forms = fs.getFiles(["forms"]);
  const tables = fs.getFiles(["tables"]);
  let auth = files?.find((item) => item?.id?.toString() === "auth");

  forms = forms?.map((item) => ({
    ...item,
    fields: [
      ...item?.fields,
      {
        name: "Is read",
        type: "boolean",
        slug: "is_read",
      },
      {
        name: "Archived",
        type: "boolean",
        slug: "archived",
      },
      {
        name: "Created at",
        type: "boolean",
        default: "now()",
        slug: "created_at",
      },
    ],
  }));

  let all_tables = [...tables, auth, ...forms];

  for await (const item of all_tables) {
    let fileColumns = item?.fields;
    let dbColumns = await knex(item?.table).columnInfo();

    //ADD OR MODIFY
    const hasTable = await knex.schema.hasTable(item?.table);

    if (!!hasTable) {
      fileColumns = fileColumns.filter((item) => item?.primary_key !== true);
      delete dbColumns["id"];
    }

    await knex.schema?.[!!hasTable ? "alterTable" : "createTable"]?.(
      item?.table,
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
      await knex.schema.alterTable(item?.table, (table) => {
        columnsToRemove.forEach((col) => {
          table.dropColumn(col);
        });
      });
    }

    await createPreferencesIfNotExist(item?.id);
  }
};
