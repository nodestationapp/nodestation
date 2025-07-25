import { knex } from "@nstation/db";
import { encrypt } from "@nstation/utils";
import upsertEntry from "@nstation/tables/server/utils/upsertEntry.js";

export default async (req, res) => {
  const { id } = req?.params;
  let body = req?.body;

  let dataToUpdate = {};

  if (body.hasOwnProperty("provider")) {
    dataToUpdate.provider = body.provider;
  }

  if (body.hasOwnProperty("email")) {
    dataToUpdate.email = body.email;
  }

  if (body.hasOwnProperty("content")) {
    const encryptedFields = ["password", "api_key"];

    let provider = await knex("nodestation_email_providers")
      .where({
        id,
      })
      .first()
      .jsonParser();

    encryptedFields.forEach((field) => {
      if (body.content.hasOwnProperty(field)) {
        if (provider?.content?.[field] !== body.content[field]) {
          body.content[field] = encrypt(body.content[field]);
        }
      }
    });

    dataToUpdate.content = body.content;
  }

  if (body.hasOwnProperty("is_default")) {
    if (body.is_default) {
      await knex("nodestation_email_providers")
        .where("is_default", 1)
        .update({ is_default: 0 });
      dataToUpdate.is_default = 1;
    } else {
      dataToUpdate.is_default = 0;
    }
  }

  try {
    await upsertEntry({
      id: "nodestation_email_providers",
      body: dataToUpdate,
      entry_id: id,
    });

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
