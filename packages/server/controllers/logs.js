import { knex, queryBuilder } from "@nstation/db";

const getLogs = async (req, res) => {
  const pageSize = 50;
  const { page = 1, ...rest } = req?.query;

  try {
    const data = await queryBuilder({
      table: "nodestation_logs",
      sort: ["created_at", "desc"],
      filters: rest,
      pagination: {
        pageSize,
        page,
      },
    });

    const totalItems = await knex("nodestation_logs")
      .count("id as count")
      .first();
    const hasNextPage = page * pageSize < totalItems.count;

    return res.status(200).json({
      items: data,
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
