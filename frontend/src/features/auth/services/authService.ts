import { axiosInstance } from "../../../interceptors/axiosInstance";
import { LoginRequest, RegisterRequest, AuthResponse } from "../types/auth";

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    // We adjust the endpoint if it is different, assuming /auth/login based on convention
    const response = await axiosInstance.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<any> => {
    // Assuming /users for registration
    const response = await axiosInstance.post("/users/register", data);
    return response.data;
  },

  getMe: async () => {
    const response = await axiosInstance.get("/users/me");
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  },
};
