import bcrypt from "bcryptjs";

import upsertEntry from "../../../tables/server/utils/upsertEntry.js";

export default async (req, res) => {
  let body = req?.body;
  const files = req?.files;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body?.password, salt);
    body.password = hashedPassword;
    body.photo = body?.photo?.id || body?.photo;

    await upsertEntry({
      id: "nodestation_users",
      body,
      files,
      entry_id: body?.id,
    });

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
