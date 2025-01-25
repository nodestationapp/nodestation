import express from "express";

import { uploader } from "@nstation/utils";
import { authMiddleware } from "@nstation/auth";

import {
  getAllTables,
  getTable,
  createTable,
  updateTable,
  deleteTable,
  addTableEntry,
  updateTableEntry,
  deleteTableEntries,
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

router
  .route("/:id/entry")
  .post(authMiddleware(["admin"]), uploader, addTableEntry)
  .delete(authMiddleware(["admin"]), deleteTableEntries);

router
  .route("/:id/entry/:entry_id")
  .put(authMiddleware(["admin"]), uploader, updateTableEntry);

export default router;
