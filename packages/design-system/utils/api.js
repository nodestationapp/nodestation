import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000`
      : `${window.location.origin}`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use((res) => {
  return res.data;
});

export default api;
