import express from "express";
import { authMiddleware } from "@nstation/auth";

import {
  getAllEditor,
  createEditor,
  updateEditor,
  deleteEditor,
} from "#controllers/editor.js";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware(["admin"]), getAllEditor)
  .post(authMiddleware(["admin"]), createEditor)
  .put(authMiddleware(["admin"]), updateEditor)
  .delete(authMiddleware(["admin"]), deleteEditor);

export default router;
