import knex from "../knex.js";
import { fs } from "../../../utils/index.js";

const typesMap = {
  id: "string",
  text: "string",
  long_text: "text",
  select: "string",
  media: "text",
  numeric: "integer",
  json: "json",
  boolean: "integer",
  date: "bigInteger",
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

  return column;
}

export default async () => {
  const files = fs.getFiles();
  let forms = fs.getFiles(["forms"]);
  const tables = fs.getFiles(["tables"]);
  let auth = files?.find((item) => item?.id?.toString() === "auth");

  auth = { ...auth, slug: "nodestation_users" };
  forms = forms
    ?.map((item) => ({ ...item, slug: item?.id }))
    ?.map((item) => ({
      ...item,
      fields: [
        ...item?.fields,
        {
          name: "id",
          type: "id",
          slug: "id",
          primary_key: true,
          default: "generate_id()",
        },
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
    let dbColumns = await knex(item?.slug).columnInfo();

    //ADD OR MODIFY
    const hasTable = await knex.schema.hasTable(item?.slug);

    if (!!hasTable) {
      fileColumns = fileColumns.filter((item) => item?.primary_key !== true);
      delete dbColumns["id"];
    }

    await knex.schema?.[!!hasTable ? "alterTable" : "createTable"]?.(
      item?.slug,
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
      await knex.schema.alterTable(item?.slug, (table) => {
        columnsToRemove.forEach((col) => {
          table.dropColumn(col);
        });
      });
    }
  }
};
