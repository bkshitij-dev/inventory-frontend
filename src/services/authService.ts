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
