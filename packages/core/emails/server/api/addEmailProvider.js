import upsertEntry from "@nstation/tables/server/utils/upsertEntry.js";

export default async (req, res) => {
  let body = req?.body;

  try {
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
