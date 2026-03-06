import axios from "axios";
import toast from "../utils/toast";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (
      config.url?.includes("/superadmin") &&
      !config.url?.includes("/verify-access")
    ) {
      const accessCode = process.env.REACT_APP_SUPERADMIN_ACCESS_CODE;
      config.headers["x-admin-access-code"] = accessCode;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response?.status === 401 &&
      !error.config.url.includes("/users/me")
    ) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else if (error.response?.status === 403) {
      toast.error("Access denied");
    } else if (error.response?.status >= 500) {
      toast.error("Server error. Please try again later.");
    } else if (error.code === "ECONNABORTED") {
      toast.error("Request timeout. Please try again.");
    }

    return Promise.reject(error);
  },
);

export default api;
