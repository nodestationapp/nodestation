import express from "express";

import logsRoute from "./logs.js";
import formsRoute from "./forms.js";
import mediaRoute from "./media.js";
import editorRoute from "./editor.js";
import emailsRoute from "./emails.js";
import tablesRoute from "./tables.js";
import preferencesRoute from "./preferences.js";

const router = express.Router();

router.use("/logs", logsRoute);
router.use("/forms", formsRoute);
router.use("/media", mediaRoute);
router.use("/editor", editorRoute);
router.use("/emails", emailsRoute);
router.use("/tables", tablesRoute);
router.use("/preferences", preferencesRoute);

export default router;
