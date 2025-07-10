import fs from "fs";
import path from "path";
import morgan from "morgan";
import micromatch from "micromatch";
import { rootPath } from "@nstation/utils";
import requireFromString from "require-from-string";
import log from "./log.js";

const configExists = fs.existsSync(
  path.join(rootPath, "nodestation.config.js")
);

let parsedConfig = {};
if (!!configExists) {
  let config = fs.readFileSync(
    path.join(rootPath, "nodestation.config.js"),
    "utf-8"
  );

  parsedConfig = requireFromString(config);
  parsedConfig = parsedConfig.logger;
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
  const level = getLevel(tokens.status(req, res));

  const data = {
    level,
    user: req?.user?.id,
    source: "api",
    message: {
      ip: req.ip,
      url: tokens.url(req, res),
      method: tokens.method(req, res),
      status: tokens.status(req, res),
      body: sanitizeSensitiveData(req.body),
      headers: sanitizeSensitiveData(req.headers),
      response_time: tokens["response-time"](req, res),
    },
  };

  const timestamp = tokens.date(req, res, "iso");

  let ignore = parsedConfig?.ignore || [];
  let allow = parsedConfig?.allow || [];
  allow = [...allow, "/api/**"];

  if (
    micromatch.isMatch(data.message?.url, allow) &&
    !micromatch.isMatch(data.message?.url, ignore)
  ) {
    log(data);
  }

  return [
    timestamp.padEnd(24),
    data.message?.method.padEnd(3),
    String(data.message?.status).padStart(1),
    data.message?.url,
    data.response_time,
  ].join(" ");
});

export default logger;
