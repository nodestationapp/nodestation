import { Routes, Route, Navigate } from "react-router-dom";

import authRoutes from "./auth";
import clientRoutes from "./client";
import Register from "pages/auth/register";
import AuthLayout from "components/layouts/AuthLayout";

import { useApp } from "@nstation/utils/ui/contexts/app.js";
import { useAuth } from "@nstation/core/auth/client/contexts/authMiddleware.js";
import DashboardLayout from "layouts/DashboardLayout";

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
  const { menuLinks } = useApp();

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {menuLinks.map((link) => {
          const Component = link.Component;
          return (
            <Route
              key={link.to}
              path={`${link.to}/*`}
              element={<Component />}
            />
          );
        })}
      </Route>
    </Routes>
  );
  // <Routes>
  //   {!!is_admin ? (
  //     routes_type_render(user?.type)
  //   ) : (
  //     <Route element={<AuthLayout />}>
  //       <Route index path="/register" element={<Register />} />
  //     </Route>
  //   )}
  //   <Route
  //     path="*"
  //     element={
  //       <Navigate
  //         to={!!!user?.type ? (!!is_admin ? "/login" : "/register") : `/`}
  //         replace
  //       />
  //     }
  //   />
  // </Routes>
};

export default AppRoutes;
