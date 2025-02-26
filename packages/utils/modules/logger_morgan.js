import morgan from "morgan";
import { knex } from "@nstation/db";

const logger = morgan((tokens, req, res) => {
  const data = {
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: tokens.status(req, res),
    responseTime: tokens["response-time"](req, res) + "ms",
    ip: req.ip,
    headers: req.headers,
    body: req.body,
    timestamp: tokens.date(req, res, "iso"),
  };

  knex("nodestation_logs")
    .insert({
      level: "success",
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: tokens.status(req, res),
      responseTime: tokens["response-time"](req, res) + "ms",
      ip: req.ip,
      headers: req.headers,
      body: req.body,
    })
    .catch((err) => console.error("Błąd zapisu logu:", err));

  return [
    data.timestamp.padEnd(24),
    data.method.padEnd(3),
    String(data.status).padStart(1),
    data.url,
    data.responseTime,
  ].join(" ");
});

export default logger;
