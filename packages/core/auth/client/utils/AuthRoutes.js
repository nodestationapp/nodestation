import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/login.js";
import Verify from "../pages/auth/verify.js";
import Register from "../pages/auth/register.js";
import ForgetPassword from "../pages/auth/forget-password/Content/index.js";
import ResetPassword from "../pages/auth/forget-password/reset/Content/index.js";
import { useAuth } from "../contexts/authMiddleware.js";

const AuthRoutes = () => {
  const { user, is_admin } = useAuth();

  return (
    <Routes>
      {is_admin ? (
        <Route path="/login" element={<Login />} />
      ) : (
        <Route path="/register" element={<Register />} />
      )}
      <Route path="/verify" element={<Verify />} />
      <Route path="/forget-password">
        <Route index element={<ForgetPassword />} />
        <Route path="reset" element={<ResetPassword />} />
      </Route>
      <Route
        path="*"
        element={
          <Navigate
            to={!!user?.id ? "/" : is_admin ? "/login" : "/register"}
            replace
          />
        }
      />
    </Routes>
  );
};

export default AuthRoutes;
