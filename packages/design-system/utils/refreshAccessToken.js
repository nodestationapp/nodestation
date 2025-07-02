import api from "./api.js";

const refreshAccessToken = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const refresh_token = localStorage.getItem("refresh_token");

      const tokens = await api.post("/admin-api/auth/refresh-token", {
        refresh_token,
      });

      resolve({
        access_token: tokens?.access_token,
        refresh_token: tokens?.refresh_token,
      });
    } catch (error) {
      document.cookie = `access_token=; max-age=0; path=/`;
      localStorage.removeItem("refresh_token");

      reject(error);
    }
  });

export default refreshAccessToken;
