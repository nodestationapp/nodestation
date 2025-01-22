import { knex } from "@nstation/db";

const sanitizeSensitiveData = (body) => {
  const sensitiveFields = ["password", "access_token"];

  let sanitizedBody = body;

  sensitiveFields.forEach((field) => {
    if (sanitizedBody[field]) {
      sanitizedBody[field] = "***";
    }
  });

  return sanitizedBody;
};

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
        body: sanitizeSensitiveData(req?.body),
        method: req?.method,
        headers: req?.headers,
      },
      res: {
        body: sanitizeSensitiveData(responseBody),
        status: res?.statusCode,
      },
    });

    req?.io?.emit("new_log");
  } catch (err) {
    console.error(err);
  }
};

export default logger;
