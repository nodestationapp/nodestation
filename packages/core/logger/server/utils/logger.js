import morgan from "morgan";
import { knex } from "@nstation/db";

const getLevel = (status) => {
  let level = null;

  if (status >= 100 && status <= 399) {
    level = "success";
  } else if (status >= 400 && status <= 599) {
    level = "error";
  }

  return level;
};

const sanitizeSensitiveData = (body) => {
  const sensitiveFields = ["password", "access_token", "authorization"];

  let sanitizedBody = body;

  sensitiveFields.forEach((field) => {
    if (sanitizedBody?.[field]) {
      sanitizedBody[field] = "***";
    }
  });

  return sanitizedBody;
};

const logger = morgan((tokens, req, res) => {
  const allowedEndpoints = [
    "/api",
    "/admin-api/auth/login",
    "/admin-api/auth/register",
    "/admin-api/auth/password-reset",
    "/admin-api/auth/change-password",
    "/admin-api/auth/login",
  ];

  const data = {
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: tokens.status(req, res),
    responseTime: tokens["response-time"](req, res),
    res: res.locals.responseBody,
    ip: req.ip,
    headers: req.headers,
    body: req.body,
    timestamp: tokens.date(req, res, "iso"),
  };

  const level = getLevel(data?.status);

  const canLogToDB = allowedEndpoints.some((endpoint) =>
    data.url.startsWith(endpoint)
  );

  if (!!canLogToDB) {
    knex("nodestation_logger")
      .insert({
        level,
        method: data.method,
        url: data.url,
        status: data.status,
        ip: data.ip,
        res: data.res,
        headers: sanitizeSensitiveData(data.headers),
        body: sanitizeSensitiveData(data.body),
        response_time: data.responseTime,
      })
      .catch((err) => console.error(err));

    // req?.io?.emit("new_log");
  }

  return [
    data.timestamp.padEnd(24),
    data.method.padEnd(3),
    String(data.status).padStart(1),
    data.url,
    data.responseTime,
  ].join(" ");
});

export default logger;
