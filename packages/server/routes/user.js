import express from "express";
import { uploader } from "@nstation/utils";
import { authMiddleware } from "@nstation/auth";

import { getUserMe, checkIsAdmin, updateUserMe } from "#controllers/user.js";

const router = express.Router();

router.route("/check-admin").get(checkIsAdmin);
router
  .route("/me")
  .get(authMiddleware(["admin"]), getUserMe)
  .put(authMiddleware(["admin"]), uploader, updateUserMe);

export default router;
