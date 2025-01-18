import "./modules/passport.js";

import login from "./modules/login.js";
import register from "./modules/register.js";
import resetPassword from "./modules/resetPassword.js";
import authMiddleware from "./modules/authMiddleware.js";
import changePassword from "./modules/changePassword.js";
import emailActivation from "./modules/emailActivation.js";
import resetPasswordConfirm from "./modules/resetPasswordConfirm.js";

export {
  login,
  register,
  resetPassword,
  changePassword,
  authMiddleware,
  emailActivation,
  resetPasswordConfirm,
};
