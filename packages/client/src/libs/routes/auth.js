import { Route } from "react-router-dom";

import AuthLayout from "components/layouts/AuthLayout";

import Login from "pages/auth/login";
import Verify from "pages/auth/verify";

import ResetPassword from "pages/auth/forget-password/reset";
import ForgetPassword from "pages/auth/forget-password";

const authRoutes = () => (
  <Route element={<AuthLayout />}>
    <Route index path="/login" element={<Login />} />
    <Route path="/verify" element={<Verify />} />
    <Route path="/forget-password">
      <Route index element={<ForgetPassword />} />
      <Route path="reset" element={<ResetPassword />} />
    </Route>
  </Route>
);

export default authRoutes;
