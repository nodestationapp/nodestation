import addMedia from "./addMedia.js";
import getMedia from "./getMedia.js";
import deleteMedia from "./deleteMedia.js";
import getMediaSettings from "./getMediaSettings.js";
import updateMediaSettings from "./updateMediaSettings.js";

import uploader from "../utils/uploader/index.js";

import getMediaSchema from "../docs/get-media.js";
import addMediaSchema from "../docs/post-media.js";
import deleteMediaSchema from "../docs/delete-media.js";
import updateMediaSettingsSchema from "../docs/put-media-settings.js";
import getMediaSettingsSchema from "../docs/get-media-settings.js";

export default [
  {
    method: "GET",
    path: "/admin-api/media",
    handler: getMedia,
    auth: ["admin"],
    validation: getMediaSchema,
  },
  {
    method: "POST",
    path: "/admin-api/media",
    handler: addMedia,
    auth: ["admin"],
    middlewares: [uploader],
    validation: addMediaSchema,
  },
  {
    method: "DELETE",
    path: "/admin-api/media/:id",
    handler: deleteMedia,
    auth: ["admin"],
    validation: deleteMediaSchema,
  },
  {
    method: "PUT",
    path: "/admin-api/media/settings",
    handler: updateMediaSettings,
    auth: ["admin"],
    validation: updateMediaSettingsSchema,
  },
  {
    method: "GET",
    path: "/admin-api/media/settings",
    handler: getMediaSettings,
    auth: ["admin"],
    validation: getMediaSettingsSchema,
  },
];
