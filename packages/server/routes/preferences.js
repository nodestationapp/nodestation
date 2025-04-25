import express from "express";
import authMiddleware from "@nstation/core/auth/utils/authMiddleware.js";

import {
  getPreferences,
  upsertPreferences,
  createTableView,
  updateTableView,
  removeTableView,
} from "#controllers/preferences.js";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware(["admin"]), getPreferences)
  .post(authMiddleware(["admin"]), upsertPreferences);

router.route("/create").post(authMiddleware(["admin"]), createTableView);
router
  .route("/:id")
  .delete(authMiddleware(["admin"]), removeTableView)
  .put(authMiddleware(["admin"]), updateTableView);

export default router;
