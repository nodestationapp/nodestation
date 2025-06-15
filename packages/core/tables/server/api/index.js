import getTable from "./getTable.js";
import getTables from "./getTables.js";
import updateTable from "./updateTable.js";
import createTable from "./createTable.js";
import removeTable from "./removeTable.js";
import getPreferences from "./getPreferences.js";
import createTableView from "./createTableView.js";
import updateTableView from "./updateTableView.js";
import removeTableView from "./removeTableView.js";
import updateTableEntry from "./updateTableEntry.js";
import createTableEntry from "./createTableEntry.js";
import upsertPreferences from "./upsertPreferences.js";
import removeTableEntries from "./removeTableEntries.js";
import getAllTables from "./getAllTables.js";

import auth from "@nstation/auth/utils/authMiddleware.js";

import validate from "../utils/validate.js";
import addTableEntrySchema from "../utils/addTableEntrySchema.js";

export default [
  {
    method: "POST",
    path: "/admin-api/preferences",
    handler: upsertPreferences,
    middlewares: [auth(["admin"])],
  },
  {
    method: "GET",
    path: "/admin-api/tables/all",
    handler: getAllTables,
    middlewares: [auth(["admin"])],
  },
  {
    method: "GET",
    path: "/admin-api/tables/:id",
    handler: getTable,
    middlewares: [auth(["admin"])],
  },
  {
    method: "PUT",
    path: "/admin-api/tables/:id",
    handler: updateTable,
    middlewares: [auth(["admin"])],
  },
  {
    method: "DELETE",
    path: "/admin-api/tables/:id/entry/:entry_id",
    handler: removeTableEntries,
    middlewares: [auth(["admin"])],
  },
  {
    method: "PUT",
    path: "/admin-api/tables/:id/entry/:entry_id",
    handler: updateTableEntry,
    middlewares: [auth(["admin"])],
  },
  {
    method: "POST",
    path: "/admin-api/tables/:id/entry",
    handler: createTableEntry,
    middlewares: [
      auth(["admin"]),
      validate({ getValidationSchema: addTableEntrySchema }),
    ],
  },
  {
    method: "GET",
    path: "/admin-api/preferences",
    handler: getPreferences,
    middlewares: [auth(["admin"])],
  },
  {
    method: "POST",
    path: "/admin-api/preferences/create",
    handler: createTableView,
    middlewares: [auth(["admin"])],
  },
  {
    method: "PUT",
    path: "/admin-api/preferences/:id",
    handler: updateTableView,
    middlewares: [auth(["admin"])],
  },
  {
    method: "DELETE",
    path: "/admin-api/preferences/:id",
    handler: removeTableView,
    middlewares: [auth(["admin"])],
  },
  {
    method: "POST",
    path: "/admin-api/tables",
    handler: createTable,
    middlewares: [auth(["admin"])],
  },
  {
    method: "GET",
    path: "/admin-api/tables",
    handler: getTables,
    middlewares: [auth(["admin"])],
  },
  {
    method: "DELETE",
    path: "/admin-api/tables/:id",
    handler: removeTable,
    middlewares: [auth(["admin"])],
  },
];
