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
    path: "/media",
    handler: getMedia,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "POST",
    path: "/media",
    handler: addMedia,
    middlewares: [authMiddleware(["admin"]), uploader],
  },
  {
    method: "DELETE",
    path: "/media/:id",
    handler: deleteMedia,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "PUT",
    path: "/media/settings",
    handler: updateMediaSettings,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "GET",
    path: "/media/settings",
    handler: getMediaSettings,
    middlewares: [authMiddleware(["admin"])],
  },
];
