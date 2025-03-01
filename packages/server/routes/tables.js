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

import validate from "#libs/validation/validate.js";
import createTableSchema from "#libs/validation/tables/createTableSchema.js";
import addTableEntrySchema from "#libs/validation/tables/addTableEntrySchema.js";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware(["admin"]), getAllTables)
  .post(
    authMiddleware(["admin"]),
    validate({ schema: createTableSchema }),
    createTable
  );
router
  .route("/:id")
  .get(authMiddleware(["admin"]), getTable)
  .put(authMiddleware(["admin"]), updateTable)
  .delete(authMiddleware(["admin"]), deleteTable);

router.route("/:id/entry").post(
  authMiddleware(["admin"]),
  uploader,
  // validate({ getValidationSchema: addTableEntrySchema }),
  addTableEntry
);

router
  .route("/:id/entry/:entry_id")
  .put(
    authMiddleware(["admin"]),
    uploader,
    // validate({ getValidationSchema: addTableEntrySchema }),
    updateTableEntry
  )
  .delete(authMiddleware(["admin"]), deleteTableEntries);

export default router;
