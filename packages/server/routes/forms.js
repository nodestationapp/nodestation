import express from "express";
import { authMiddleware } from "@nstation/auth";

import {
  getAllForms,
  getForm,
  createForm,
  updateForm,
  deleteForm,
  entryUpdateForm,
  deleteEntryForm,
} from "#controllers/forms.js";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware(["admin"]), getAllForms)
  .post(authMiddleware(["admin"]), createForm);
router
  .route("/entry/:id")
  .put(authMiddleware(["admin"]), entryUpdateForm)
  .delete(authMiddleware(["admin"]), deleteEntryForm);

router
  .route("/:id")
  .get(authMiddleware(["admin"]), getForm)
  .put(authMiddleware(["admin"]), updateForm)
  .delete(authMiddleware(["admin"]), deleteForm);

export default router;
