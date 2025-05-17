import upsertEntry from "../utils/upsertEntry.js";

export default async (req, res) => {
  const body = req?.body;
  const { id } = req?.params;

  try {
    await upsertEntry({
      id,
      body,
      entry_id: body?.id,
    });

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
