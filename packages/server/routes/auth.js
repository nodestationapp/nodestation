import express from "express";
import { uploader } from "@nstation/utils";
import { authMiddleware } from "@nstation/auth";

import {
  authLogin,
  getAllAuth,
  addUserAuth,
  authRegister,
  authActivation,
  updateUserAuth,
  getSettingsAuth,
  authResetPassword,
  updateSettingsAuth,
  authChangePassword,
  authResetPasswordConfirm,
} from "#controllers/auth.js";

const router = express.Router();

router.route("/login").post(authLogin);
router.route("/register").post(authRegister);
router.route("/activation").post(authActivation);
router
  .route("/")
  .get(authMiddleware(["admin"]), getAllAuth)
  .post(authMiddleware(["admin"]), uploader, addUserAuth);
router.route("/password-reset").post(authResetPassword);
router
  .route("/change-password")
  .put(authMiddleware(["admin"]), authChangePassword);
router.route("/password-reset/confirm").post(authResetPasswordConfirm);
router
  .route("/settings")
  .get(authMiddleware(["admin"]), getSettingsAuth)
  .put(authMiddleware(["admin"]), updateSettingsAuth);

router.route("/:id").put(authMiddleware(["admin"]), uploader, updateUserAuth);

export default router;
