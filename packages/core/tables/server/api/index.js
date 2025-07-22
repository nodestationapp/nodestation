import getTable from "./getTable.js";
import updateTable from "./updateTable.js";
import createTable from "./createTable.js";
import removeTable from "./removeTable.js";
import getPreferences from "./getPreferences.js";
import updateTableView from "./updateTableView.js";
import removeTableView from "./removeTableView.js";
import updateTableEntry from "./updateTableEntry.js";
import createTableEntry from "./createTableEntry.js";
import upsertPreferences from "./upsertPreferences.js";
import createPreferences from "./createPreferences.js";
import removeTableEntries from "./removeTableEntries.js";
import getAllTables from "./getAllTables.js";
import updatePreferences from "./updatePreferences.js";

import addTableEntrySchema from "../utils/addTableEntrySchema.js";

import getTablesSchema from "../docs/get-tables.js";
import getTableSchema from "../docs/get-table.js";
import updateTableSchema from "../docs/put-table.js";
import createTableSchema from "../docs/post-table.js";
import removeTableSchema from "../docs/delete-table.js";

import getPreferencesSchema from "../docs/get-preferences.js";
import upsertPreferencesSchema from "../docs/post-preferences.js";
import updateTableViewSchema from "../docs/put-preferences.js";
import removeTableViewSchema from "../docs/delete-preferences.js";
import updatePreferencesSchema from "../docs/put-preferences.js";

export default [
  // {
  //   method: "POST",
  //   path: "/admin-api/preferences",
  //   handler: upsertPreferences,
  //   auth: ["admin"],
  //   validation: upsertPreferencesSchema,
  // },
  {
    method: "GET",
    path: "/admin-api/tables/:id",
    handler: getTable,
    auth: ["admin"],
    validation: getTableSchema,
  },
  {
    method: "PUT",
    path: "/admin-api/tables/:id",
    handler: updateTable,
    auth: ["admin"],
    validation: updateTableSchema,
  },
  {
    method: "DELETE",
    path: "/admin-api/tables/:id/entry/:entry_id",
    handler: removeTableEntries,
    auth: ["admin"],
  },
  {
    method: "PUT",
    path: "/admin-api/tables/:id/entry/:entry_id",
    handler: updateTableEntry,
    auth: ["admin"],
  },
  {
    method: "POST",
    path: "/admin-api/tables/:id/entry",
    handler: createTableEntry,
    auth: ["admin"],
    validation: addTableEntrySchema,
  },
  {
    method: "POST",
    path: "/admin-api/preferences",
    handler: createPreferences,
    auth: ["admin"],
    validation: upsertPreferencesSchema,
  },
  {
    method: "PUT",
    path: "/admin-api/preferences/:id",
    handler: updatePreferences,
    auth: ["admin"],
    validation: updatePreferencesSchema,
  },
  {
    method: "GET",
    path: "/admin-api/preferences",
    handler: getPreferences,
    auth: ["admin"],
    validation: getPreferencesSchema,
  },
  // {
  //   method: "PUT",
  //   path: "/admin-api/preferences/:id",
  //   handler: updateTableView,
  //   auth: ["admin"],
  //   validation: updateTableViewSchema,
  // },
  {
    method: "DELETE",
    path: "/admin-api/preferences/:id",
    handler: removeTableView,
    auth: ["admin"],
    validation: removeTableViewSchema,
  },
  {
    method: "POST",
    path: "/admin-api/tables",
    handler: createTable,
    auth: ["admin"],
    validation: createTableSchema,
  },
  {
    method: "GET",
    path: "/admin-api/tables",
    handler: getAllTables,
    auth: ["admin"],
    validation: getTablesSchema,
  },
  {
    method: "DELETE",
    path: "/admin-api/tables/:id",
    handler: removeTable,
    auth: ["admin"],
    validation: removeTableSchema,
  },
];
