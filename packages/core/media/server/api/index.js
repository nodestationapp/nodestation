import addMedia from "./addMedia.js";
import getMedia from "./getMedia.js";
import deleteMedia from "./deleteMedia.js";
import getMediaSettings from "./getMediaSettings.js";
import updateMediaSettings from "./updateMediaSettings.js";
import authMiddleware from "@nstation/auth/utils/authMiddleware.js";

import uploader from "../utils/uploader/index.js";

export default [
  {
    method: "GET",
    path: "/admin-api/media",
    handler: getMedia,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "POST",
    path: "/admin-api/media",
    handler: addMedia,
    middlewares: [authMiddleware(["admin"]), uploader],
  },
  {
    method: "DELETE",
    path: "/admin-api/media/:id",
    handler: deleteMedia,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "PUT",
    path: "/admin-api/media/settings",
    handler: updateMediaSettings,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "GET",
    path: "/admin-api/media/settings",
    handler: getMediaSettings,
    middlewares: [authMiddleware(["admin"])],
  },
];
