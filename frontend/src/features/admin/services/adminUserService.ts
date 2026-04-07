import { axiosInstance } from "../../../interceptors/axiosInstance";
import { User, ApiResponse } from "../../auth/types/auth";

export interface UserCreatePayload {
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
  role?: string;
}

export interface UserUpdatePayload {
  email?: string;
  phone?: string;
  role?: string;
}

export const adminUserService = {
  getAllUsers: async (): Promise<ApiResponse<User[]>> => {
    const response = await axiosInstance.get<ApiResponse<User[]>>("/users");
    return response.data;
  },
  getUserById: async (id: number): Promise<ApiResponse<User>> => {
    const response = await axiosInstance.get<ApiResponse<User>>(`/users/${id}`);
    return response.data;
  },
  createUser: async (data: UserCreatePayload): Promise<ApiResponse<User>> => {
    const response = await axiosInstance.post<ApiResponse<User>>("/users", data);
    return response.data;
  },
  updateUser: async (id: number, data: UserUpdatePayload): Promise<ApiResponse<User>> => {
    const response = await axiosInstance.put<ApiResponse<User>>(`/users/${id}`, data);
    return response.data;
  },
  deleteUser: async (id: number): Promise<ApiResponse<string>> => {
    const response = await axiosInstance.delete<ApiResponse<string>>(`/users/${id}`);
    return response.data;
  }
};
