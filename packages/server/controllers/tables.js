import slugify from "slugify";
import { fs } from "@nstation/utils";
import { knex, createSchema, queryBuilder } from "@nstation/db";

import upsertEntry from "#libs/upsertEntry.js";

const getAllTables = async (_, res) => {
  try {
    let tables = fs.getFiles(`/src/schemas/tables/**/*.json`);

    const preferences = await knex("nodestation_preferences")
      .select()
      .orderBy("created_at", "asc");

    const formatted_tables = tables?.map((item) => {
      const view =
        preferences?.find(
          (element) => element?.table_id === item?.id && !!element?.last_viewed
        )?.id ||
        preferences?.find((element) => element?.table_id === item?.id)?.id;

      return {
        ...item,
        id: item?.id,
        view,
      };
    });

    return res.status(200).json(formatted_tables);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getTable = async (req, res) => {
  let { id } = req?.params;
  let { view, type, ...rest } = req?.query || {};

  try {
    let views = await knex("nodestation_preferences")
      .where({
        table_id: id,
      })
      .orderBy("created_at", "asc");

    let preferences;

    if (!!view) {
      preferences = await knex("nodestation_preferences")
        .where({
          id: view,
        })
        .first()
        .jsonParser();

      await knex("nodestation_preferences")
        .where({
          table_id: id,
        })
        .update({
          last_viewed: null,
        });

      await knex("nodestation_preferences")
        .where({
          id: view,
        })
        .update({
          last_viewed: 1,
        });
    }

    const file_name = id === "nodestation_users" ? "auth" : id;

    let tables = fs.getFiles(
      `/src/schemas/${type ? `${type}/` : ""}${file_name}.json`
    );

    let table = tables?.[0];

    let columns = table?.fields;
    if (id === "nodestation_users") {
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

      table.id = "nodestation_users";
    }

    const filters = [
      ...(preferences?.filters || []),
      ...Object.keys(rest)?.map((item) => ({
        field: item,
        value: req?.query?.[item],
      })),
    ];

    const entries = await queryBuilder({
      table,
      filters,
      sort: preferences?.sort?.[0],
    });

    return res
      .status(200)
      .json({ table, entries, columns, preferences, views });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const createTable = async (req, res) => {
  const body = req?.body;
  const { type } = req?.query;

  try {
    const formatted_body = {
      name: body?.name,
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

    const slug = slugify(body?.name, { lower: true, replacement: "-" });

    await fs.createFile({
      content: formatted_body,
      path: `/src/schemas/${type}/${slug}.json`,
    });

    await knex("nodestation_preferences").insert({
      table_id: slug,
      name: "Entries",
      uid: req?.user?.id,
    });

    await createSchema();

    return res.status(200).json({ id: slug });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const updateTable = async (req, res) => {
  const body = req?.body;
  const { id } = req?.params;
  const { type } = req?.query;

  try {
    await fs.updateFile({
      content: body,
      path: `/src/schemas/${type ? `${type}/` : ""}${id}.json`,
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
  const { type } = req?.query;

  try {
    const tables = fs.getFiles(["tables"]);
    const table = tables?.find(
      (item) => item?.id?.toString() === id?.toString()
    );

    await fs.deleteFile(`/src/schemas/${type ? `${type}/` : ""}${id}.json`);
    await knex.schema.dropTable(id);

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
      type: id !== "nodestation_users" ? "tables" : null,
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
      type: id === "nodestation_users" ? "auth" : "tables",
      id: id === "nodestation_users" ? "auth" : id,
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
    await knex(id).where({ id: entry_id }).del();

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
