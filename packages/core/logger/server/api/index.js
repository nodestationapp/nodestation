import getLogs from "./getLogs.js";
import authMiddleware from "@nstation/auth/utils/authMiddleware.js";

export default [
  {
    method: "GET",
    path: "/admin-api/logger",
    handler: getLogs,
    middlewares: [authMiddleware(["admin"])],
  },
];
