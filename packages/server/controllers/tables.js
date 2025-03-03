import { fs } from "@nstation/utils";
import { knex, createSchema, queryBuilder } from "@nstation/db";

import upsertEntry from "#libs/upsertEntry.js";

const getAllTables = async (_, res) => {
  try {
    const tables = fs.getFiles(["tables"]);

    return res.status(200).json(tables);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const safeJSONParse = (input) => {
  try {
    return JSON.parse(input);
  } catch (error) {
    return input;
  }
};
const parseJSONFields = (array) => {
  return array.map((item) => {
    return Object.fromEntries(
      Object.entries(item).map(([key, value]) => {
        const parsedValue = safeJSONParse(value);
        return [key, parsedValue];
      })
    );
  });
};

const getTable = async (req, res) => {
  let { id } = req?.params;
  let query = req?.query || {};

  try {
    let preferences = await knex("nodestation_preferences").where({
      table_id: id,
    });
    preferences = parseJSONFields(preferences)?.[0];

    const auth = fs.getFiles();
    let tables = fs.getFiles(["tables", "forms"]);
    const authTable = auth?.find((item) => item?.id?.toString() === "auth");
    tables.push(authTable);

    const table = tables?.find(
      (item) => item?.id?.toString() === id?.toString()
    );

    let columns = table?.fields;
    if (id === "auth") {
      columns = !!columns
        ? [
            {
              name: "User",
              sort: "first_name",
              type: "user_profile",
              slug: "user",
              origin: "system",
            },
            ...(columns || []),
          ]
        : [];

      columns = columns?.filter(
        (item) =>
          item?.slug !== "first_name" &&
          item?.slug !== "last_name" &&
          item?.slug !== "photo" &&
          item?.slug !== "password"
      );
    }

    const filters = [
      ...(preferences?.filters || []),
      ...Object.keys(query)?.map((item) => ({
        field: item,
        value: query?.[item],
      })),
    ];

    const entries = await queryBuilder({
      table,
      filters,
      sort: preferences?.sort?.[0],
    });

    return res.status(200).json({ table, entries, columns, preferences });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const createTable = async (req, res) => {
  const body = req?.body;

  try {
    const formatted_body = {
      ...body,
      display_name: "id",
      fields: [
        {
          name: "ID",
          type: "id",
          slug: "id",
          primary_key: true,
          default: "generate_id()",
        },
      ],
    };

    const id = await fs.createFile({
      body: formatted_body,
      type: body?.type,
    });

    await createSchema();

    return res.status(200).json({ id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const updateTable = async (req, res) => {
  const { id } = req?.params;
  const body = req?.body;

  try {
    await fs.createFile({
      body: body,
      entry_id: id,
      type: body?.type,
    });

    await createSchema();

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteTable = async (req, res) => {
  const { id } = req?.params;

  try {
    const tables = fs.getFiles(["tables"]);
    const table = tables?.find(
      (item) => item?.id?.toString() === id?.toString()
    );

    await fs.deleteFile(id);
    await knex.schema.dropTable(table?.table);

    return res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const addTableEntry = async (req, res) => {
  const body = req?.body;
  const files = req?.files;
  const { id } = req?.params;

  try {
    await upsertEntry({
      type: id !== "auth" ? "tables" : null,
      id,
      body,
      files,
    });

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const updateTableEntry = async (req, res) => {
  const body = req?.body;
  const files = req?.files;
  const { id, entry_id } = req?.params;

  try {
    await upsertEntry({
      type: id !== "auth" ? "tables" : null,
      id,
      body,
      files,
      entry_id,
    });

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteTableEntries = async (req, res) => {
  const { id, entry_id } = req?.params;

  try {
    const tables = id !== "auth" ? fs.getFiles(["tables"]) : fs.getFiles();
    const table = tables?.find(
      (item) => item?.id?.toString() === id?.toString()
    );

    await knex(table?.table).where({ id: entry_id }).del();

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export {
  getAllTables,
  getTable,
  createTable,
  updateTable,
  deleteTable,
  addTableEntry,
  updateTableEntry,
  deleteTableEntries,
};
