import { apiClient } from "@/services/api";
import type {
  AuthSession,
  AuthUser,
  ForgotPasswordInput,
  LoginInput,
  ResetPasswordInput,
} from "./auth.types";

export const authService = {
  login: (input: LoginInput) => apiClient.post<AuthSession>("/auth/login", input),
  refresh: () => apiClient.post<{ accessToken: string }>("/auth/refresh"),
  logout: () => apiClient.post<null>("/auth/logout"),
  me: (accessToken: string) => apiClient.get<AuthUser>("/auth/me", { accessToken }),
  forgotPassword: (input: ForgotPasswordInput) =>
    apiClient.post<null>("/auth/forgot-password", input),
  resetPassword: (input: ResetPasswordInput) =>
    apiClient.post<null>("/auth/reset-password", input),
};
