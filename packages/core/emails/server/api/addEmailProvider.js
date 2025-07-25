import upsertEntry from "@nstation/tables/server/utils/upsertEntry.js";
import { encrypt } from "@nstation/utils";

export default async (req, res) => {
  let body = req?.body;

  try {
    if (body.hasOwnProperty("content")) {
      const encryptedFields = ["password", "api_key"];

      encryptedFields.forEach((field) => {
        if (body.content.hasOwnProperty(field)) {
          body.content[field] = encrypt(body.content[field]);
        }
      });
    }

    await upsertEntry({
      id: "nodestation_email_providers",
      body,
    });

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
