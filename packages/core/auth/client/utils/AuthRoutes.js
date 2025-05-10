import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/login.js";
import Register from "../pages/auth/register.js";

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
