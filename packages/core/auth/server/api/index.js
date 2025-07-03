import "../../utils/passport.js";

import me from "./me.js";
import login from "./login.js";
import addUser from "./addUser.js";
import register from "./register.js";
import updateMe from "./updateMe.js";
import checkAdmin from "./check-admin.js";
import refreshToken from "./refreshToken.js";
import changePassword from "./changePassword.js";
import updateTemplates from "./updateTemplates.js";
import emailActivation from "./emailActivation.js";
import resetPassword from "./resetPassword.js";
import checkResetPassword from "./checkResetPassword.js";
import resetPasswordConfirm from "./resetPasswordConfirm.js";

import validate from "@nstation/tables/server/utils/validate.js";
import addTableEntrySchema from "@nstation/tables/server/utils/addTableEntrySchema.js";

import authMiddleware from "../../utils/authMiddleware.js";
import loginSchema from "../utils/validations/loginSchema.js";
import resetPasswordSchema from "../utils/validations/resetPasswordSchema.js";
import resetPasswordConfirmSchema from "../utils/validations/resetPasswordConfirmSchema.js";

export default [
  {
    method: "POST",
    path: "/admin-api/auth/user",
    handler: addUser,
    middlewares: [
      authMiddleware(["admin"]),
      validate({
        getValidationSchema: (req) =>
          addTableEntrySchema({
            ...req,
            params: { id: "nodestation_users" },
          }),
      }),
    ],
  },
  {
    method: "GET",
    path: "/admin-api/auth/check-admin",
    handler: checkAdmin,
    middlewares: [],
  },
  {
    method: "POST",
    path: "/admin-api/auth/login",
    handler: login,
    middlewares: [validate({ schema: loginSchema })],
  },
  {
    method: "POST",
    path: "/admin-api/auth/register",
    handler: register,
    middlewares: [],
  },
  {
    method: "GET",
    path: "/admin-api/auth/me",
    handler: me,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "PUT",
    path: "/admin-api/auth/me",
    handler: updateMe,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "PUT",
    path: "/admin-api/auth/change-password",
    handler: changePassword,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "PUT",
    path: "/admin-api/auth/templates",
    handler: updateTemplates,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "POST",
    path: "/admin-api/auth/activation",
    handler: emailActivation,
    middlewares: [],
  },
  {
    method: "POST",
    path: "/admin-api/auth/reset-password",
    handler: resetPassword,
    middlewares: [validate({ schema: resetPasswordSchema })],
  },
  {
    method: "GET",
    path: "/admin-api/auth/reset-password",
    handler: checkResetPassword,
    middlewares: [],
  },
  {
    method: "POST",
    path: "/admin-api/auth/reset-password/confirm",
    handler: resetPasswordConfirm,
    middlewares: [validate({ schema: resetPasswordConfirmSchema })],
  },
  {
    method: "POST",
    path: "/admin-api/auth/refresh-token",
    handler: refreshToken,
    middlewares: [],
  },
];
