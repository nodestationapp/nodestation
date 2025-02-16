import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? `${process.env.REACT_APP_API}/admin/api`
      : `${window.location.origin}/admin/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use((res) => {
  return res.data;
});

export default api;
