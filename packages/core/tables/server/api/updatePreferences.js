import { knex, singleJsonStringify } from "@nstation/db";

export default async (req, res) => {
  const body = req?.body;

  try {
    let dataToUpdate = {};

    if (body?.hasOwnProperty("name")) {
      dataToUpdate.name = body.name;
    }

    if (body?.hasOwnProperty("sort")) {
      dataToUpdate.sort = singleJsonStringify(body.sort);
    }

    if (body?.hasOwnProperty("filters")) {
      dataToUpdate.filters = singleJsonStringify(body.filters);
    }

    if (body?.hasOwnProperty("content")) {
      dataToUpdate.content = singleJsonStringify(body.content);
    }

    if (body?.hasOwnProperty("visibility")) {
      dataToUpdate.visibility = singleJsonStringify(body.visibility);
    }

    if (!!Object.keys(dataToUpdate)?.length) {
      dataToUpdate.updated_at = Math.floor(Date.now() / 1000);
    }

    if (Object.keys(dataToUpdate).length > 0) {
      await knex("nodestation_preferences")
        .where("id", req?.params?.id)
        .update(dataToUpdate);
    }

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
