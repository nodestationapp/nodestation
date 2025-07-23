import { Helmet } from "react-helmet";
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/login.js";
import Verify from "../pages/auth/verify.js";
import Register from "../pages/auth/register.js";
import ForgetPassword from "../pages/auth/forget-password/index.js";
import ForgetPasswordReset from "../pages/auth/forget-password/reset.js";

import { useAuth } from "../contexts/authMiddleware.js";

import { useSlot } from "contexts/slots.js";
import { useApp } from "contexts/app.js";

const AuthRoutes = () => {
  const { site, is_admin } = useApp();
  const { user } = useAuth();
  const slot = useSlot("auth.public-routes.add");

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{site?.title || "Nodestation"}</title>
        {!!site?.favicon && <link rel="icon" href={site.favicon} />}
      </Helmet>
      <Routes>
        {is_admin ? (
          <>
            {slot?.[0]?.map((route) => {
              return <Route path={route.path} element={<route.Component />} />;
            })}
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route
              path="/forget-password/reset"
              element={<ForgetPasswordReset />}
            />
            <Route
              path="*"
              element={<Navigate to={!!user?.id ? "/" : "/login"} replace />}
            />
          </>
        ) : (
          <Route path="/register" element={<Register />} />
        )}
      </Routes>
    </>
  );
};

export default AuthRoutes;
