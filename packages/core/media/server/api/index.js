import getMediaSettings from "./getMediaSettings.js";
import updateMediaSettings from "./updateMediaSettings.js";
import authMiddleware from "../../../auth/utils/authMiddleware.js";

export default [
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
