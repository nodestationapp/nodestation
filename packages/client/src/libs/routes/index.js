import { Routes, Route, Navigate } from "react-router-dom";

import authRoutes from "./auth";
import clientRoutes from "./client";
import Register from "pages/auth/register";
import AuthLayout from "components/layouts/AuthLayout";

import { useApp } from "context/app";

const routes_type_render = (user_type, plugins) => {
  switch (user_type) {
    case "admin":
    case "client":
      return clientRoutes({ plugins });
    default:
      return authRoutes();
  }
};

const AppRoutes = () => {
  const { user, is_admin, plugins } = useApp();

  return (
    <Routes>
      {!!is_admin ? (
        routes_type_render(user?.type, plugins)
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
