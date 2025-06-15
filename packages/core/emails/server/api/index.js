import addEmail from "./addEmail.js";
import getEmails from "./getEmails.js";
import deleteEmail from "./deleteEmail.js";
import getEmailSettings from "./getEmailSettings.js";
import updateEmailSettings from "./updateEmailSettings.js";

import authMiddleware from "@nstation/auth/utils/authMiddleware.js";

export default [
  {
    method: "GET",
    path: "/admin-api/emails",
    handler: getEmails,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "POST",
    path: "/admin-api/emails",
    handler: addEmail,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "DELETE",
    path: "/admin-api/emails/:id",
    handler: deleteEmail,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "GET",
    path: "/admin-api/emails/settings",
    handler: getEmailSettings,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "PUT",
    path: "/admin-api/emails/settings",
    handler: updateEmailSettings,
    middlewares: [authMiddleware(["admin"])],
  },
];
