import express from "express";
import { authMiddleware } from "@nstation/auth";

import { getPreferences, upsertPreferences } from "#controllers/preferences.js";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware(["admin"]), getPreferences)
  .post(authMiddleware(["admin"]), upsertPreferences);

export default router;
