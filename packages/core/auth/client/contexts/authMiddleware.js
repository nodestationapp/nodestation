import { useCookies } from "react-cookie";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import Login from "../pages/auth/login.js";
import Verify from "../pages/auth/verify.js";
import Register from "../pages/auth/register.js";
import ForgetPassword from "../pages/auth/forget-password/Content/index.js";
import ResetPassword from "../pages/auth/forget-password/reset/Content/index.js";
import SplashScreen from "components/SplashScreen";

import api from "libs/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [is_admin, setIsAdmin] = useState(false);

  useEffect(() => {
    (async function () {
      const { is_admin } = await api.get("/api/plugins/auth/check-admin");
      setIsAdmin(is_admin);

      await getUserData(cookies?.access_token);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserData = async (access_token) => {
    try {
      if (!!access_token) {
        const me = await api.get(`/api/plugins/auth/me`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (me?.user) {
          api.interceptors.request.use(
            (config) => {
              config.headers["Authorization"] = "Bearer " + access_token;
              return config;
            },
            (error) => {
              Promise.reject(error);
            }
          );

          setUser({ ...me?.user, project_name: me?.project_name });
        }
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const userUpdate = (values) =>
    new Promise(async (resolve, reject) => {
      try {
        await api.put("/api/plugins/auth/me", { ...values });

        getUserData(cookies?.access_token);
        resolve();
      } catch (err) {
        console.error(err);
        reject();
      }
    });

  const login = ({ email, password }) =>
    new Promise(async (resolve, reject) => {
      try {
        const data = await api.post(`/api/plugins/auth/login`, {
          email,
          password,
        });

        setCookie("access_token", data?.access_token, { maxAge: 1707109200 });

        getUserData(data?.access_token);
        resolve();
      } catch (err) {
        reject(err);
      }
    });

  const handleLogout = async () => {
    api.interceptors.request.use((config) => {
      delete config.headers.Authorization;
      return config;
    });

    removeCookie("access_token");
    window.location.replace("/login");

    setUser(null);
  };

  const value = useMemo(() => {
    return {
      user,
      login,
      userUpdate,
      handleLogout,
      getUserData,
      is_admin,
      setIsAdmin,
    };
    // eslint-disable-next-line
  }, [user, is_admin]);

  if (!!loading) return <SplashScreen />;

  return (
    <AuthContext.Provider value={value}>
      {!!!user?.id ? (
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
      ) : (
        <>
          {children}
          <Routes>
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
        </>
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { AuthContext, useAuth };
export default AuthProvider;
