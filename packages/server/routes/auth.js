import express from "express";
import { uploader } from "@nstation/utils";
import { authMiddleware } from "@nstation/auth";

import limiter from "#libs/rate-limit.js";

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

router.route("/login").post(limiter, authLogin);
router.route("/register").post(limiter, authRegister);
router.route("/activation").post(limiter, authActivation);
router
  .route("/")
  .get(authMiddleware(["admin"]), getAllAuth)
  .post(authMiddleware(["admin"]), uploader, addUserAuth);
router.route("/password-reset").post(authResetPassword);
router
  .route("/change-password")
  .put(limiter, authMiddleware(["admin"]), authChangePassword);
router.route("/password-reset/confirm").post(limiter, authResetPasswordConfirm);
router
  .route("/settings")
  .get(authMiddleware(["admin"]), getSettingsAuth)
  .put(authMiddleware(["admin"]), updateSettingsAuth);

router.route("/:id").put(authMiddleware(["admin"]), uploader, updateUserAuth);

export default router;
