export interface LoginRequest {
  username?: string;
  email?: string;
  password?: string;
}

export interface RegisterRequest {
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
  authenticated: boolean;
}

export interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  role: string;
  provider: string;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}
