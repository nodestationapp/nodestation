import "../../utils/passport.js";

import me from "./me.js";
import login from "./login.js";
import addUser from "./addUser.js";
import register from "./register.js";
import updateMe from "./updateMe.js";
import refreshToken from "./refreshToken.js";
import changePassword from "./changePassword.js";
import updateTemplates from "./updateTemplates.js";
import emailActivation from "./emailActivation.js";
import resetPassword from "./resetPassword.js";
import createAccessToken from "./createAccessToken.js";
import checkResetPassword from "./checkResetPassword.js";
import resetPasswordConfirm from "./resetPasswordConfirm.js";

import validate from "@nstation/tables/server/utils/validate.js";
import addTableEntrySchema from "@nstation/tables/server/utils/addTableEntrySchema.js";

import loginSchema from "../docs/login.js";
import registerSchema from "../utils/validations/registerSchema.js";
// import resetPasswordSchema from "../utils/validations/resetPasswordSchema.js";
// import resetPasswordConfirmSchema from "../utils/validations/resetPasswordConfirmSchema.js";

import meSchema from "../docs/get-me.js";
import updateMeSchema from "../docs/update-me.js";
import changePasswordSchema from "../docs/update-change-password.js";
import updateTemplatesSchema from "../docs/update-templates.js";
import addUserSchema from "../docs/add-user.js";
import emailActivationSchema from "../docs/post-activation.js";
import checkResetPasswordSchema from "../docs/get-reset-password.js";
import refreshTokenSchema from "../docs/post-refresh-token.js";
import resetPasswordSchema from "../docs/post-reset-password.js";
import resetPasswordConfirmSchema from "../docs/post-reset-password-confirm.js";
import postApiKeySchema from "../docs/post-api-key.js";

export default [
  {
    method: "POST",
    path: "/admin-api/auth/user",
    handler: addUser,
    auth: ["admin"],
    validation: addUserSchema,
    middlewares: [
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
    method: "POST",
    handler: login,
    validation: loginSchema,
    path: "/admin-api/auth/login",
  },
  {
    method: "POST",
    path: "/admin-api/auth/register",
    handler: register,
    hidden: true,
  },
  {
    method: "GET",
    path: "/admin-api/auth/me",
    handler: me,
    auth: ["admin"],
    validation: meSchema,
  },
  {
    method: "PUT",
    path: "/admin-api/auth/me",
    handler: updateMe,
    auth: ["admin"],
    validation: updateMeSchema,
  },
  {
    method: "PUT",
    path: "/admin-api/auth/change-password",
    handler: changePassword,
    auth: ["admin"],
    validation: changePasswordSchema,
  },
  {
    method: "PUT",
    path: "/admin-api/auth/templates",
    handler: updateTemplates,
    auth: ["admin"],
    validation: updateTemplatesSchema,
  },
  {
    method: "POST",
    path: "/admin-api/auth/activation",
    handler: emailActivation,
    validation: emailActivationSchema,
    hidden: true,
  },
  {
    method: "POST",
    path: "/admin-api/auth/reset-password",
    handler: resetPassword,
    validation: resetPasswordSchema,
  },
  {
    method: "GET",
    path: "/admin-api/auth/reset-password",
    handler: checkResetPassword,
    validation: checkResetPasswordSchema,
  },
  {
    method: "POST",
    path: "/admin-api/auth/reset-password/confirm",
    handler: resetPasswordConfirm,
    validation: resetPasswordConfirmSchema,
  },
  {
    method: "POST",
    path: "/admin-api/auth/refresh-token",
    handler: refreshToken,
    validation: refreshTokenSchema,
  },
  {
    method: "POST",
    path: "/admin-api/auth/api-key",
    handler: createAccessToken,
    validation: postApiKeySchema,
  },
];
