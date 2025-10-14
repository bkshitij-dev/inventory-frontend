import { api } from "../utils/api";
import { ApiResponse } from "../types/ApiResponse";

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  usernameOrEmail: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}

export async function register(payload: RegisterPayload): Promise<ApiResponse<void>> {
  const { data } = await api.post<ApiResponse<void>>("/auth/register", payload);
  return data;
}

export async function login(payload: LoginPayload): Promise<ApiResponse<AuthResponse>> {
  const { data } = await api.post<ApiResponse<AuthResponse>>("/auth/login", payload);
  return data;
}

export async function verifyUser(token: string): Promise<ApiResponse<void>> {
  const { data } = await api.post<ApiResponse<void>>("/auth/verify", {token});
  return data;
};

export async function resendVerificationEmailUsingEmail(email: string): Promise<ApiResponse<void>> {
  const { data } = await api.post<ApiResponse<void>>("/auth/resend-verification", {email});
  return data;
};

export async function resendVerificationEmailUsingToken(token: string): Promise<ApiResponse<void>> {
  const { data } = await api.post<ApiResponse<void>>("/auth/resend-verification", {token});
  return data;
};

export async function sendForgotPasswordEmail(email: string): Promise<ApiResponse<void>> {
  const { data } = await api.post<ApiResponse<void>>("/auth/forgot-password", {email});
  return data;
};