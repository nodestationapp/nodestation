import express from "express";
import authMiddleware from "@nstation/core/auth/utils/authMiddleware.js";

import {
  getAllEmails,
  createEmail,
  updateEmail,
  deleteEmail,
  getEmailSettings,
  updateEmailSettings,
} from "#controllers/emails.js";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware(["admin"]), getAllEmails)
  .post(authMiddleware(["admin"]), createEmail);
router
  .route("/settings")
  .get(authMiddleware(["admin"]), getEmailSettings)
  .put(authMiddleware(["admin"]), updateEmailSettings);
router
  .route("/:id")
  .put(authMiddleware(["admin"]), updateEmail)
  .delete(authMiddleware(["admin"]), deleteEmail);

export default router;
