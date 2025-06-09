import upsertEntry from "../../utils/upsertEntry.js";

export default async (req, res) => {
  const body = req?.body;
  const id = req?.route?.path?.split("/")?.[4];
  const entry_id = req?.params?.entry_id;

  try {
    await upsertEntry({ id, body, entry_id });

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
