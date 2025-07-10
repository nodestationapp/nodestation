import getLogs from "./getLogs.js";
import getLogsSettings from "./getLogsSettings.js";
import updateLogsSettings from "./updateLogsSettings.js";
import authMiddleware from "@nstation/auth/utils/authMiddleware.js";

export default [
  {
    method: "GET",
    path: "/admin-api/logger",
    handler: getLogs,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "GET",
    path: "/admin-api/logger/settings",
    handler: getLogsSettings,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "PUT",
    path: "/admin-api/logger/settings",
    handler: updateLogsSettings,
    middlewares: [authMiddleware(["admin"])],
  },
];
