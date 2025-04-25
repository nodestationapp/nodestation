import "../../utils/passport.js";

import me from "./me.js";
import login from "./login.js";
import register from "./register.js";
import updateMe from "./updateMe.js";
import checkAdmin from "./check-admin.js";
import changePassword from "./changePassword.js";

import authMiddleware from "../../utils/authMiddleware.js";

export default [
  {
    method: "GET",
    path: "/plugins/auth/check-admin",
    handler: checkAdmin,
    middlewares: [],
  },
  {
    method: "POST",
    path: "/plugins/auth/login",
    handler: login,
    middlewares: [],
  },
  {
    method: "POST",
    path: "/plugins/auth/register",
    handler: register,
    middlewares: [],
  },
  {
    method: "GET",
    path: "/plugins/auth/me",
    handler: me,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "PUT",
    path: "/plugins/auth/me",
    handler: updateMe,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "PUT",
    path: "/plugins/auth/change-password",
    handler: changePassword,
    middlewares: [authMiddleware(["admin"])],
  },
];
