import { fs } from "@nstation/utils";
import { knex } from "@nstation/db";

const getAllEmails = async (req, res) => {
  try {
    const emails = fs.getFiles(["emails"]);

    return res.status(200).json(emails);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const createEmail = async (req, res) => {
  const body = req?.body;

  try {
    const id = await fs.createFile({ body, type: "em" });

    return res.status(200).json(id);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const updateEmail = async (req, res) => {
  const body = req?.body;
  const { id } = req?.params;

  try {
    await fs.createFile({ body, type: "em", entry_id: id });

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteEmail = async (req, res) => {
  const { id } = req?.params;

  try {
    await fs.deleteFile(id);

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getEmailSettings = async (req, res) => {
  try {
    const settings = await knex("nodestation_email_settings")
      .where({ id: 1 })
      .first();

    let formatted_settings = {};
    if (!!settings) {
      formatted_settings = Object.fromEntries(
        Object.entries(settings).map(([key, value]) => {
          if (value) {
            try {
              return [key, JSON.parse(value)];
            } catch {
              return [key, value];
            }
          }
          return [key, value];
        })
      );
    }

    return res.status(200).json(formatted_settings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const updateEmailSettings = async (req, res) => {
  let body = req?.body;

  try {
    let formatted_body = body?.type === "active" ? body?.active : { ...body };

    if (body?.type !== "active") {
      delete formatted_body["type"];

      const settings = await knex("nodestation_email_settings")
        .where({ id: 1 })
        .select("active")
        .first();

      const is_some_empty = Object.values(body).some(
        (value) => value === null || value === undefined || value === ""
      );

      if (!!is_some_empty && body?.type === settings?.active) {
        await knex("nodestation_email_settings").where({ id: 1 }).update({
          active: null,
        });
      }

      formatted_body = JSON.stringify(formatted_body);
    }

    await knex("nodestation_email_settings")
      .where({ id: 1 })
      .first()
      .then(async (existing) => {
        if (existing) {
          await knex("nodestation_email_settings")
            .where({ id: 1 })
            .update({
              [body?.type]: formatted_body,
            });
        } else {
          await knex("nodestation_email_settings").insert({
            id: 1,
            [body?.type]: formatted_body,
          });
        }
      });

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export {
  getAllEmails,
  createEmail,
  updateEmail,
  deleteEmail,
  getEmailSettings,
  updateEmailSettings,
};
