import { createSchema, knex } from "@nstation/db";
import { fs } from "@nstation/utils";

const getAllForms = async (_, res) => {
  try {
    const forms = fs.getFiles(["forms"]);

    let formatted_forms = [];
    for await (const item of forms) {
      const total_count = await knex(item?.id)
        .count("* as count")
        .first()
        .then((row) => row?.count);

      const unread_count = await knex(item?.id)
        .where({
          is_read: 0,
          archived: 0,
        })
        .count("* as count")
        .first()
        .then((row) => row.count);

      formatted_forms.push({
        ...item,
        total_count,
        unread_count,
      });
    }

    return res.status(200).json(formatted_forms);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getForm = async (req, res) => {
  let { sort } = req?.query;

  sort = !!sort ? sort?.split(":") : ["id", "asc"];

  try {
    const forms = fs.getFiles(["forms"]);
    const form = forms?.find(
      (item) => item?.id?.toString() === req?.params?.id?.toString()
    );

    const entries_query = await knex(form?.id)
      .where({
        archived: parseInt(req?.query?.archived || 0),
      })
      .orderBy(sort?.[0], sort?.[1]);
    // .orderBy("created_at", "desc");

    // let formatted_incoming = formatted_entries_query?.map((item) => ({
    //   ...item,
    //   data: Object.keys(item?.data).reduce((acc, curr) => {
    //     if (item?.data?.[curr]?.size) {
    //       acc[curr] = {
    //         ...item?.data?.[curr],
    //         url: `http://localhost:4040/${item?.data?.[curr]?.url}`,
    //       };
    //     } else {
    //       acc[curr] = item?.data?.[curr];
    //     }
    //     return acc;
    //   }, {}),
    // }));

    const formatted_query = {
      form,
      incoming: entries_query,
    };

    return res.status(200).json(formatted_query);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const createForm = async (req, res) => {
  const body = req?.body;

  try {
    const formatted_body = {
      ...body,
      type: "form",
    };

    const id = await fs.createFile(formatted_body);

    await createSchema();

    return res.status(200).json(id);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const updateForm = async (req, res) => {
  const body = req?.body;

  try {
    const formatted_body = {
      ...body,
      type: "form",
    };

    await fs.updateFile(req?.params?.id, formatted_body);

    await createSchema();

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteForm = async (req, res) => {
  const { id } = req?.params;

  try {
    await fs.deleteFile(id);
    await knex.schema.dropTable(id);

    return res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const entryUpdateForm = async (req, res) => {
  const body = req?.body;
  const { id, entry_id } = req?.params;

  try {
    // const updated_at = Date.now();

    if (body?.is_read !== undefined) {
      await knex(id)
        .where({ id: entry_id })
        .update({
          is_read: !!body?.is_read ? 1 : 0,
        });
    }

    if (body?.archived !== undefined) {
      await knex(id)
        .where({ id: entry_id })
        .update({
          archived: !!body?.archived ? 1 : 0,
        });
    }

    return res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteEntryForm = async (req, res) => {
  const { id } = req?.params;

  //TODO
  try {
    // await knex("nodestation_forms").where({ id }).del();

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export {
  getAllForms,
  getForm,
  createForm,
  updateForm,
  deleteForm,
  entryUpdateForm,
  deleteEntryForm,
};
