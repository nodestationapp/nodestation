import express from "express";
import authMiddleware from "@nstation/core/auth/utils/authMiddleware.js";

import { getLogs, logsReadAll } from "#controllers/logs.js";

const router = express.Router();

router.route("/").get(authMiddleware(["admin"]), getLogs);
router.route("/read-all").put(authMiddleware(["admin"]), logsReadAll);

export default router;
