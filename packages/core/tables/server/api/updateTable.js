import { fs } from "@nstation/utils";
import { createSchema } from "@nstation/db";

export default async (req, res) => {
  const body = req?.body;
  const { id } = req?.params;
  const { type } = req?.query;

  const content = {
    ...body,
    tableName: id,
  };

  try {
    await fs.updateFile({
      content,
      path: `/src/schemas/${type ? `${type}/` : ""}${id}.json`,
    });

    await createSchema();

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
