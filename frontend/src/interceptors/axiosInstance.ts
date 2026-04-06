import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/demo-auth",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // Only redirect and toast if we are not already on the login/register page
        if (
          !window.location.pathname.includes("/login") &&
          !window.location.pathname.includes("/register")
        ) {
          toast.error("Session expired, please login again.");
          window.location.href = "/login";
        }
      } else {
        // Handle other standard errors
        const errorData: any = error.response.data;
        const errorMessage = errorData?.message || errorData?.error || "An error occurred";
        toast.error(errorMessage);
      }
    } else if (error.request) {
      toast.error("Network error. Please check your connection.");
    } else {
      toast.error("An unexpected error occurred");
    }
    return Promise.reject(error);
  }
);
