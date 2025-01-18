import express from "express";
import { authMiddleware } from "@nstation/auth";

import {
  getAllTables,
  getTable,
  createTable,
  updateTable,
  deleteTable,
} from "#controllers/tables.js";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware(["admin"]), getAllTables)
  .post(authMiddleware(["admin"]), createTable);
router
  .route("/:id")
  .get(authMiddleware(["admin"]), getTable)
  .put(authMiddleware(["admin"]), updateTable)
  .delete(authMiddleware(["admin"]), deleteTable);

export default router;
