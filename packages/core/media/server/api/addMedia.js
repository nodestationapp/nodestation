import { knex } from "@nstation/db";

function extractUploadPath(fullPath) {
  const uploadIndex = fullPath.indexOf("/uploads/");
  if (uploadIndex !== -1) {
    return fullPath.substring(uploadIndex);
  }
  return null;
}

export default async (req, res) => {
  let files = req?.files;

  try {
    for await (const file of files) {
      const upload_path = !!file?.path
        ? extractUploadPath(file?.path)
        : file?.location;

      await knex("nodestation_media").insert({
        name: file?.originalname,
        url: upload_path,
        type: file?.mimetype,
        size: file?.size,
      });
    }

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
