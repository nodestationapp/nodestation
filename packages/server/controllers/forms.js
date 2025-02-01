import { knex } from "@nstation/db";
import { fs } from "@nstation/utils";

const getAllForms = async (_, res) => {
  try {
    const forms = fs.getFiles(["forms"]);

    let formatted_forms = [];
    for await (const item of forms) {
      const total_count = await knex("nodestation_forms")
        .where({ form_id: item?.id?.toString() })
        .count("* as count")
        .then((row) => row.count);

      const unread_count = await knex("nodestation_forms")
        .where({
          form_id: item?.id?.toString(),
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
  try {
    const forms = fs.getFiles(["forms"]);
    const form = forms?.find(
      (item) => item?.id?.toString() === req?.params?.id?.toString()
    );

    const entries_query = await knex("nodestation_forms")
      .where({
        form_id: form?.id,
        archived: parseInt(req?.query?.archived || 0),
      })
      .orderBy("created_at", "desc");

    const formatted_entries_query = entries_query?.map((item) => ({
      ...item,
      data: JSON.parse(item?.data),
    }));

    const formatted_incoming = formatted_entries_query?.map((item) => ({
      ...item,
      data: Object.keys(item?.data).reduce((acc, curr) => {
        if (item?.data?.[curr]?.size) {
          acc[curr] = {
            ...item?.data?.[curr],
            url: `http://localhost:4040/${item?.data?.[curr]?.url}`,
          };
        } else {
          acc[curr] = item?.data?.[curr];
        }
        return acc;
      }, {}),
    }));

    const formatted_query = {
      form,
      incoming: formatted_incoming,
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

    return res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const entryUpdateForm = async (req, res) => {
  const body = req?.body;
  const { id } = req?.params;

  try {
    const updated_at = Date.now();

    if (body?.is_read !== undefined) {
      await knex("nodestation_forms")
        .where({ id: parseInt(id) })
        .update({
          is_read: !!body?.is_read ? 1 : 0,
          updated_at: updated_at,
        });
    }

    if (body?.archived !== undefined) {
      await knex("nodestation_forms")
        .where({ id: parseInt(id) })
        .update({
          archived: !!body?.archived ? 1 : 0,
          updated_at: updated_at,
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

  try {
    await knex("nodestation_forms").where({ id }).del();

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
