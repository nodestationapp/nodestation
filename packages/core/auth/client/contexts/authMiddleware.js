import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import AuthRoutes from "../utils/AuthRoutes.js";
import SplashScreen from "components/SplashScreen";

import api from "libs/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [is_admin, setIsAdmin] = useState(false);

  useEffect(() => {
    (async function () {
      const { is_admin } = await api.get("/auth/check-admin");
      setIsAdmin(is_admin);

      await getUserData(cookies?.access_token);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data: preferences = [],
    isLoading: preferencesloading,
    refetch: refetchPreferences,
  } = useQuery({
    queryKey: ["preferences"],
    queryFn: () => api.get("/preferences"),
    enabled: !!user?.id,
  });

  const updatePreferences = (id) => {
    let temp = [...preferences];

    const table_id = temp?.find((item) => item?.id === id)?.table_id;

    queryClient.setQueryData(["preferences"], (oldData) => {
      if (!Array.isArray(oldData)) return oldData;

      return oldData.map((item) => {
        if (item.table_id === table_id) {
          return {
            ...item,
            last_viewed: item.id === id ? 1 : null,
          };
        }
        return item;
      });
    });
  };

  const getUserData = async (access_token) => {
    try {
      if (!!access_token) {
        const me = await api.get(`/auth/me`, {
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
        await api.put("/auth/me", { ...values });

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
        const data = await api.post(`/auth/login`, {
          email,
          password,
        });

        setCookie("access_token", data?.access_token, { maxAge: 1707109200 });
        await getUserData(data?.access_token);
        navigate("/");

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
      updatePreferences,
    };
    // eslint-disable-next-line
  }, [user, is_admin]);

  if (!!loading) return <SplashScreen />;

  return (
    <AuthContext.Provider value={value}>
      {!user?.id ? <AuthRoutes /> : children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { AuthContext, useAuth };
export default AuthProvider;
