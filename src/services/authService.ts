import { api } from "../utils/api";

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

export async function register(payload: RegisterPayload) {
  const { data } = await api.post("/auth/register", payload);
  return data;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
}

export const verifyUser = async (token: string) => {
  return api.get(`/auth/verify?token=${token}`);
};

export const resendVerificationEmailUsingEmail = async (email: string) => {
  return api.get(`/auth/resend-verification?email=${email}`);
};

export const resendVerificationEmailUsingToken = async (token: string) => {
  return api.get(`/auth/resend-verification?token=${token}`);
};
