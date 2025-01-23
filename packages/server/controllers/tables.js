import slugify from "slugify";

import { fs } from "@nstation/utils";
import { knex, createSchema } from "@nstation/db";

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

const getTable = async (req, res) => {
  const { id } = req?.params;

  try {
    const tables = fs.getFiles(["tables"]);
    const table = tables?.find(
      (item) => item?.id?.toString() === id?.toString()
    );

    const entries = await knex(table?.slug).orderBy("id", "desc");

    return res.status(200).json({ table, entries });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const createTable = async (req, res) => {
  const body = req?.body;

  try {
    const slug = slugify(body?.name, {
      replacement: "_",
      lower: true,
    });

    const formatted_body = {
      ...body,
      slug,
      type: "tbl",
      fields: [
        {
          name: "id",
          slug: "id",
          type: "uuid",
          required: true,
          read_only: true,
          origin: "system",
          primary_key: true,
          default: "generate_uuid()",
        },
      ],
    };

    const id = await fs.createFile(formatted_body);

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
    const slug = slugify(body?.name, {
      replacement: "_",
      lower: true,
    });

    let formatted_fields = body?.fields?.map((item) => ({
      ...item,
      slug: slugify(item?.name, {
        replacement: "_",
        lower: true,
      }),
    }));

    const formatted_body = {
      ...body,
      slug,
      type: "tbl",
      fields: formatted_fields,
    };

    await fs.createFile(formatted_body, id);

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

    await knex.schema.dropTable(table?.slug);

    return res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const addTableEntry = async (req, res) => {
  const { id } = req?.params;
  const body = req?.body;
  const files = req?.files;

  try {
    await upsertEntry({ type: "tables", id, body, files });

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const updateTableEntry = async (req, res) => {
  const { id, entry_id } = req?.params;
  const body = req?.body;
  const files = req?.files;

  try {
    await upsertEntry({ type: "tables", id, body, files, entry_id });

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
};
