import getLogs from "./getLogs.js";
import getLogsSettings from "./getLogsSettings.js";
import updateLogsSettings from "./updateLogsSettings.js";

import getLogsSchema from "../docs/get-logger.js";
import getLogsSettingsSchema from "../docs/get-logger-settings.js";
import updateLogsSettingsSchema from "../docs/put-logger-settings.js";

export default [
  {
    method: "GET",
    path: "/admin-api/logger",
    handler: getLogs,
    auth: ["admin"],
    validation: getLogsSchema,
  },
  {
    method: "GET",
    path: "/admin-api/logger/settings",
    handler: getLogsSettings,
    auth: ["admin"],
    validation: getLogsSettingsSchema,
  },
  {
    method: "PUT",
    path: "/admin-api/logger/settings",
    handler: updateLogsSettings,
    auth: ["admin"],
    validation: updateLogsSettingsSchema,
  },
];
