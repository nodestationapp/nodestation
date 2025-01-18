import { knex } from "@nstation/db";

const logger = async ({
  req,
  res,
  level,
  source,
  message,
  responseBody,
  responseTime,
}) => {
  try {
    const created_at = Date.now();

    await knex("nodestation_logs").insert({
      level,
      message,
      created_at,
      responseTime,
      source: JSON.stringify(source),
      req: {
        body: req?.body,
        method: req?.method,
        headers: req?.headers,
      },
      res: {
        body: responseBody,
        status: res?.statusCode,
      },
    });

    req?.io?.emit("new_log");
  } catch (err) {
    console.error(err);
  }
};

export default logger;
