import getTable from "./getTable.js";
import updateTableEntry from "./updateTableEntry.js";
import createTableEntry from "./createTableEntry.js";
import removeTableEntries from "./removeTableEntries.js";

import authMiddleware from "@nstation/auth/utils/authMiddleware.js";

// import validate from "../utils/validate.js";
// import addTableEntrySchema from "../utils/addTableEntrySchema.js";

export default [
  {
    method: "POST",
    path: "/p/tables/:id",
    handler: createTableEntry,
    // middlewares: [
    //   authMiddleware(["admin"]),
    //   validate({ getValidationSchema: addTableEntrySchema }),
    // ],
  },
  {
    method: "GET",
    path: "/p/tables/:id",
    handler: getTable,
    // middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "DELETE",
    path: "/p/tables/:id/:entry_id",
    handler: removeTableEntries,
    // middlewares: [authMiddleware(["admin"])],
  },
  {
    method: "PUT",
    path: "/p/tables/:id/:entry_id",
    handler: updateTableEntry,
    // middlewares: [authMiddleware(["admin"])],
  },
];
