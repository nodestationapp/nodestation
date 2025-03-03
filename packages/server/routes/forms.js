import express from "express";
import { authMiddleware } from "@nstation/auth";

import { getForms } from "#controllers/forms.js";

const router = express.Router();

router.route("/").get(authMiddleware(["admin"]), getForms);

export default router;
