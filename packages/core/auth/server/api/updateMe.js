import { knex } from "@nstation/db";

export default async (req, res) => {
  const body = req.body;
  const files = req?.files;

  try {
    let updateData = {};

    if (body?.first_name !== undefined) {
      updateData.first_name = body.first_name;
    }
    if (body?.last_name !== undefined) {
      updateData.last_name = body.last_name;
    }
    if (!!files?.length) {
      updateData.photo = JSON.stringify({
        name: files?.[0]?.originalname,
        url: !!files?.[0]?.path
          ? extractUploadPath(files?.[0]?.path)
          : files?.[0]?.location,
      });
    }

    if (Object.keys(updateData).length > 0) {
      await knex("nodestation_users")
        .where({ id: req?.user?.id })
        .update(updateData);
    }

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
