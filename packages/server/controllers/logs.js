import { knex } from "@nstation/db";

const getLogs = async (req, res) => {
  const pageSize = 50;
  const { page = 1 } = req?.query;

  try {
    const data = await knex("nodestation_logs")
      .orderBy("created_at", "desc")
      .limit(pageSize)
      .offset((req?.query?.page - 1) * pageSize);

    const totalItems = await knex("nodestation_logs")
      .count("id as count")
      .first();
    const hasNextPage = page * pageSize < totalItems.count;

    const formatted_data = data?.map((item) => ({
      ...item,
      source: JSON.parse(item?.source),
      req: JSON.parse(item?.req),
      res: JSON.parse(item?.res),
    }));

    return res.status(200).json({
      items: formatted_data,
      nextPage: !!hasNextPage ? parseInt(req?.query?.page) + 1 : null,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const logsReadAll = async (req, res) => {
  try {
    await knex("nodestation_logs").where({ is_read: 0 }).update({ is_read: 1 });

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export { getLogs, logsReadAll };
