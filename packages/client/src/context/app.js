import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import SplashScreen from "components/SplashScreen";

import EditorProvider from "./client/editor";
import OrganizationProvider from "./organization";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

import api from "libs/api";
import pluginsLoader from "libs/helpers/pluginsLoader";
import BreadcrumbsProvider from "./client/breadcrumps";

const plugins = pluginsLoader();

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [organizations, setOrganizations] = useState([]);
  const [forms_count, setFormsCount] = useState(0);
  const [logs_count, setLogsCount] = useState(0);
  const [is_admin, setIsAdmin] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    (async function () {
      const { is_admin } = await api.get("/user/check-admin");
      setIsAdmin(is_admin);

      await getUserData(cookies?.access_token);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async function () {
      if (!!!user) return;
      if (!!socket) return;

      const ioUrl =
        process.env.NODE_ENV === "development"
          ? `${process.env.REACT_APP_API}`
          : `${window.location.origin}`;

      const temp_socket = io.connect(ioUrl, {
        reconnection: true,
        forceNew: true,
      });

      temp_socket.emit("join", user.id);
      setSocket(temp_socket);
    })();
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (!!!socket) return;

    socket?.on("new_form_message", () => {
      queryClient.refetchQueries("tables");
      getUserData(cookies?.access_token);

      toast(
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#000",
          }}
        >
          <PaperAirplaneIcon height={20} width={20} />
          <div>
            <strong>New message</strong>
            <br />
            You have new form message!
          </div>
        </div>,
        {
          hideProgressBar: true,
        }
      );
    });

    socket?.on("new_log", () => {
      queryClient.refetchQueries("tables");
      getUserData(cookies?.access_token);
    });

    // eslint-disable-next-line
  }, [socket]);

  const getUserData = async (access_token) => {
    try {
      if (!!access_token) {
        const me = await api.get(`/user/me`, {
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
          setOrganizations(me?.user);
          setFormsCount(me?.forms_count);
          setLogsCount(me?.logs_count);
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
        await api.put("/user/me", { ...values });

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
      organizations,
      forms_count,
      setFormsCount,
      is_admin,
      setIsAdmin,
      socket,
      logs_count,
      setLogsCount,
      plugins,
    };
    // eslint-disable-next-line
  }, [user, organizations, forms_count, is_admin, socket, logs_count, plugins]);

  if (!!loading) return <SplashScreen />;

  if (!!user) {
    return (
      <AppContext.Provider value={value}>
        <OrganizationProvider>
          <BreadcrumbsProvider>
            <EditorProvider>{children}</EditorProvider>
          </BreadcrumbsProvider>
        </OrganizationProvider>
      </AppContext.Provider>
    );
  } else {
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
  }
};

const useApp = () => useContext(AppContext);
export { AppContext, useApp };
export default AppProvider;
