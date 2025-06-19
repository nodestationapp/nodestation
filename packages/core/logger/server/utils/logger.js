import fs from "fs";
import path from "path";
import morgan from "morgan";
import { knex } from "@nstation/db";
import micromatch from "micromatch";
import { rootPath } from "@nstation/utils";
import requireFromString from "require-from-string";

const configExists = fs.existsSync(path.join(rootPath, "config", "logger.js"));

let parsedConfig = {};
if (!!configExists) {
  let config = fs.readFileSync(
    path.join(rootPath, "config", "logger.js"),
    "utf-8"
  );
  parsedConfig = requireFromString(config);
}

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
  const sensitiveFields = parsedConfig?.sensitive || [];

  let sanitizedBody = body;

  sensitiveFields.forEach((field) => {
    if (sanitizedBody?.[field]) {
      sanitizedBody[field] = "***";
    }
  });

  return sanitizedBody;
};

const logger = morgan((tokens, req, res) => {
  const data = {
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: tokens.status(req, res),
    responseTime: tokens["response-time"](req, res),
    res: [],
    ip: req.ip,
    headers: req.headers,
    body: req.body,
    timestamp: tokens.date(req, res, "iso"),
  };

  const level = getLevel(data?.status);

  if (!micromatch.isMatch(data.url, parsedConfig?.ignore || [])) {
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
