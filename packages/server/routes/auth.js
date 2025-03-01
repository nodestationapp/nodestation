import express from "express";
import { uploader } from "@nstation/utils";
import { authMiddleware } from "@nstation/auth";

import limiter from "#libs/rate-limit.js";

import {
  authLogin,
  addUserAuth,
  authRegister,
  authActivation,
  updateUserAuth,
  deleteUserAuth,
  getSettingsAuth,
  authResetPassword,
  updateSettingsAuth,
  authChangePassword,
  authResetPasswordConfirm,
} from "#controllers/auth.js";

import validate from "#libs/validation/validate.js";
import emailSchema from "#libs/validation/auth/emailSchema.js";
import loginSchema from "#libs/validation/auth/loginSchema.js";
import registerSchema from "#libs/validation/auth/registerSchema.js";
import addUserEntrySchema from "#libs/validation/auth/addUserEntrySchema.js";
import changePasswordSchema from "#libs/validation/auth/changePasswordSchema.js";

const router = express.Router();

router
  .route("/login")
  .post(limiter, validate({ schema: loginSchema }), authLogin);
router
  .route("/register")
  .post(limiter, validate({ schema: registerSchema }), authRegister);
router.route("/activation").post(limiter, authActivation);
router
  .route("/")
  .post(
    authMiddleware(["admin"]),
    uploader,
    validate({ getValidationSchema: addUserEntrySchema }),
    addUserAuth
  );
router
  .route("/password-reset")
  .post(validate({ schema: emailSchema }), authResetPassword);
router
  .route("/change-password")
  .put(
    limiter,
    authMiddleware(["admin"]),
    validate({ schema: changePasswordSchema }),
    authChangePassword
  );
router.route("/password-reset/confirm").post(limiter, authResetPasswordConfirm);
router
  .route("/settings")
  .get(authMiddleware(["admin"]), getSettingsAuth)
  .put(authMiddleware(["admin"]), updateSettingsAuth);

router
  .route("/:id")
  .put(authMiddleware(["admin"]), uploader, updateUserAuth)
  .delete(authMiddleware(["admin"]), uploader, deleteUserAuth);

export default router;
