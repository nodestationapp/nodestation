import axios from "axios";
import refreshAccessToken from "./refreshAccessToken.js";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000`
      : `${window.location.origin}`,
  headers: {
    "Content-Type": "application/json",
  },
});

let loop = 0;
let isRefreshing = false;
let subscribers = [];

const subscribeTokenRefresh = (cb) => {
  subscribers.push(cb);
};

const onRefreshed = (token) => {
  subscribers.map((cb) => cb(token));
};

api.interceptors.request.use(
  (config) => {
    let token = document.cookie.match(/(?:^|;\s*)access_token=([^;]*)/);

    if (token?.[0]) {
      config.headers.Authorization = `Bearer ${token?.[1]}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res.data,
  (error) => {
    const originalRequest = error.config;

    if (
      error?.response?.status === 401 &&
      error?.response?.data?.code === "unauthorized" &&
      loop < 1
    ) {
      loop++;
      if (!isRefreshing) {
        isRefreshing = true;

        refreshAccessToken()
          .then(({ access_token, refresh_token }) => {
            onRefreshed(access_token);

            document.cookie = `access_token=${access_token}; max-age=1707109200; path=/`;
            localStorage.setItem("refresh_token", refresh_token);

            isRefreshing = false;
            subscribers = [];
          })
          .catch(() => {
            window.location.href = "/login";
          });
      }

      return new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(api(originalRequest));
        });
        loop = 0;
      });
    }

    return Promise.reject(error);
  }
);

export default api;
