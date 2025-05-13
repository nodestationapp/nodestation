import addEmail from "./addEmail.js";
import getEmails from "./getEmails.js";
import deleteEmail from "./deleteEmail.js";

import authMiddleware from "../../../auth/utils/authMiddleware.js";

export default [
  {
    method: "GET",
    path: "/emails",
    handler: getEmails,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "POST",
    path: "/emails",
    handler: addEmail,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "DELETE",
    path: "/emails/:id",
    handler: deleteEmail,
    middlewares: [authMiddleware(["admin"])],
  },
];
