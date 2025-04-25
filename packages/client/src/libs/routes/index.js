import { Routes, Route, Navigate } from "react-router-dom";

import authRoutes from "./auth";
import clientRoutes from "./client";
import Register from "pages/auth/register";
import AuthLayout from "components/layouts/AuthLayout";

import { useApp } from "@nstation/utils/ui/contexts/app.js";

const routes_type_render = (user_type) => {
  switch (user_type) {
    case "admin":
    case "client":
      return clientRoutes();
    default:
      return authRoutes();
  }
};

const AppRoutes = () => {
  const { user, is_admin } = useApp();

  return (
    <Routes>
      {!!is_admin ? (
        routes_type_render(user?.type)
      ) : (
        <Route element={<AuthLayout />}>
          <Route index path="/register" element={<Register />} />
        </Route>
      )}
      <Route
        path="*"
        element={
          <Navigate
            to={!!!user?.type ? (!!is_admin ? "/login" : "/register") : `/`}
            replace
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
