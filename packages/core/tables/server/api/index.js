import getTable from "./getTable.js";
import getTables from "./getTables.js";
import updateTable from "./updateTable.js";
import createTable from "./createTable.js";
import getPreferences from "./getPreferences.js";
import createTableView from "./createTableView.js";
import updateTableView from "./updateTableView.js";
import removeTableView from "./removeTableView.js";
import updateTableEntry from "./updateTableEntry.js";
import createTableEntry from "./createTableEntry.js";
import upsertPreferences from "./upsertPreferences.js";
import removeTableEntries from "./removeTableEntries.js";
import authMiddleware from "../../../auth/utils/authMiddleware.js";

import validate from "../utils/validate.js";
import addTableEntrySchema from "../utils/addTableEntrySchema.js";

export default [
  {
    method: "POST",
    path: "/preferences",
    handler: upsertPreferences,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "GET",
    path: "/tables/:id",
    handler: getTable,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "PUT",
    path: "/tables/:id",
    handler: updateTable,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "DELETE",
    path: "/tables/:id/entry/:entry_id",
    handler: removeTableEntries,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "PUT",
    path: "/tables/:id/entry/:entry_id",
    handler: updateTableEntry,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "POST",
    path: "/tables/:id/entry",
    handler: createTableEntry,
    middlewares: [
      authMiddleware(["admin"]),
      validate({ getValidationSchema: addTableEntrySchema }),
    ],
  },
  {
    method: "GET",
    path: "/preferences/:id",
    handler: getPreferences,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "POST",
    path: "/preferences/create",
    handler: createTableView,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "PUT",
    path: "/preferences/:id",
    handler: updateTableView,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "DELETE",
    path: "/preferences/:id",
    handler: removeTableView,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "POST",
    path: "/tables",
    handler: createTable,
    middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "GET",
    path: "/tables",
    handler: getTables,
    middlewares: [authMiddleware(["admin"])],
  },
];
