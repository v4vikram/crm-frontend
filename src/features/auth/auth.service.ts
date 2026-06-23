import { apiClient } from "@/services/api";
import type { AuthSession, AuthUser, LoginInput, RegisterInput } from "./auth.types";

export const authService = {
  register: (input: RegisterInput) => apiClient.post<AuthSession>("/auth/register", input),
  login: (input: LoginInput) => apiClient.post<AuthSession>("/auth/login", input),
  refresh: () => apiClient.post<{ accessToken: string }>("/auth/refresh"),
  logout: () => apiClient.post<null>("/auth/logout"),
  me: (accessToken: string) => apiClient.get<AuthUser>("/auth/me", { accessToken }),
};
