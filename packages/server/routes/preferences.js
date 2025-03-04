import express from "express";
import { authMiddleware } from "@nstation/auth";

import {
  getPreferences,
  upsertPreferences,
  createTableView,
} from "#controllers/preferences.js";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware(["admin"]), getPreferences)
  .post(authMiddleware(["admin"]), upsertPreferences);

router.route("/create").post(authMiddleware(["admin"]), createTableView);

export default router;
