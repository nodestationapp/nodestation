import express from "express";
import { uploader } from "@nstation/utils";
import authMiddleware from "@nstation/core/auth/utils/authMiddleware.js";

import {
  getMedia,
  addMedia,
  removeMedia,
  getMediaSettings,
  updateMediaSettings,
} from "#controllers/media.js";

const router = express.Router();

router.route("/:id").delete(authMiddleware(["admin"]), removeMedia);
router
  .route("/")
  .get(authMiddleware(["admin"]), getMedia)
  .post(uploader, addMedia);
router
  .route("/settings")
  .get(authMiddleware(["admin"]), getMediaSettings)
  .put(authMiddleware(["admin"]), updateMediaSettings);

export default router;
