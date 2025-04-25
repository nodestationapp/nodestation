// import upsertEntry from "#libs/upsertEntry.js";

export default async (req, res) => {
  const body = req?.body;
  const files = req?.files;
  const { id } = req?.params;

  try {
    // await upsertEntry({ id: "auth", body, files, entry_id: id });

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
