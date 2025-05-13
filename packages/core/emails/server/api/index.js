import addEmail from "./addEmail.js";
import getEmails from "./getEmails.js";
import deleteEmail from "./deleteEmail.js";
// import deleteMedia from "./deleteMedia.js";
// import getMediaSettings from "./getMediaSettings.js";
// import updateMediaSettings from "./updateMediaSettings.js";
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
  // {
  //   method: "DELETE",
  //   path: "/media/:id",
  //   handler: deleteMedia,
  //   middlewares: [authMiddleware(["admin"])],
  // },
  // {
  //   method: "PUT",
  //   path: "/media/settings",
  //   handler: updateMediaSettings,
  //   middlewares: [authMiddleware(["admin"])],
  // },
  // {
  //   method: "GET",
  //   path: "/media/settings",
  //   handler: getMediaSettings,
  //   middlewares: [authMiddleware(["admin"])],
  // },
];
