import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000/api`
      : `${window.location.origin}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use((res) => {
  return res.data;
});

export default api;
