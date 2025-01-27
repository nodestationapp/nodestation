import express from "express";

import authRoute from "./auth.js";
import userRoute from "./user.js";
import logsRoute from "./logs.js";
import formsRoute from "./forms.js";
import mediaRoute from "./media.js";
import editorRoute from "./editor.js";
import emailsRoute from "./emails.js";
import tablesRoute from "./tables.js";
import preferencesRoute from "./preferences.js";

const router = express.Router();

router.use("/auth", express.json(), authRoute);
router.use("/user", express.json(), userRoute);
router.use("/logs", express.json(), logsRoute);
router.use("/forms", express.json(), formsRoute);
router.use("/media", express.json(), mediaRoute);
router.use("/editor", express.json(), editorRoute);
router.use("/emails", express.json(), emailsRoute);
router.use("/tables", express.json(), tablesRoute);
router.use("/preferences", express.json(), preferencesRoute);

export default router;
