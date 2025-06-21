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
  let ignore = parsedConfig?.ignore || [];
  ignore = [...ignore, "/", "/*.*"];

  let sanitizedBody = body;

  sensitiveFields.forEach((field) => {
    if (sanitizedBody?.[field]) {
      sanitizedBody[field] = "***";
    }
  });

  return sanitizedBody;
};

const logger = morgan((tokens, req, res) => {
  const level = getLevel(tokens.status(req, res));

  const data = {
    level,
    ip: req.ip,
    user: req?.user?.id,
    url: tokens.url(req, res),
    method: tokens.method(req, res),
    status: tokens.status(req, res),
    body: sanitizeSensitiveData(req.body),
    headers: sanitizeSensitiveData(req.headers),
    response_time: tokens["response-time"](req, res),
  };

  const timestamp = tokens.date(req, res, "iso");

  if (!micromatch.isMatch(data.url, parsedConfig?.ignore || [])) {
    knex("nodestation_logger")
      .insert(data)
      .catch((err) => console.error(err));
  }

  return [
    timestamp.padEnd(24),
    data.method.padEnd(3),
    String(data.status).padStart(1),
    data.url,
    data.response_time,
  ].join(" ");
});

export default logger;
