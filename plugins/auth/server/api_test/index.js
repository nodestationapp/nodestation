import { authMiddleware } from "@nstation/auth";

import me from "./me.js";
import login from "./login.js";
import checkAdmin from "./check-admin.js";

export default [
  {
    method: "GET",
    path: "/plugins/auth/check-admin",
    handler: checkAdmin,
    middlewares: [],
  },
  {
    method: "GET",
    path: "/plugins/auth/me",
    handler: me,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "POST",
    path: "/plugins/auth/login",
    handler: login,
    middlewares: [],
  },
];
