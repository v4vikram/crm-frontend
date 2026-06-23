"use client";

import { useMutation } from "@tanstack/react-query";
import { authService } from "./auth.service";
import { useAuthStore } from "./auth.store";
import type { ForgotPasswordInput, LoginInput, RegisterInput, ResetPasswordInput } from "./auth.types";

export const useBootstrapSession = () => {
  const setSession = useAuthStore((state) => state.setSession);
  const clearSession = useAuthStore((state) => state.clearSession);

  return async () => {
    try {
      const { accessToken } = await authService.refresh();
      const user = await authService.me(accessToken);
      setSession(user, accessToken);
    } catch {
      clearSession();
    }
  };
};

export const useLogin = () => {
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: (input: LoginInput) => authService.login(input),
    onSuccess: ({ user, accessToken }) => setSession(user, accessToken),
  });
};

export const useRegister = () => {
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: (input: RegisterInput) => authService.register(input),
    onSuccess: ({ user, accessToken }) => setSession(user, accessToken),
  });
};

export const useLogout = () => {
  const clearSession = useAuthStore((state) => state.clearSession);

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => clearSession(),
  });
};

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (input: ForgotPasswordInput) => authService.forgotPassword(input),
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: (input: ResetPasswordInput) => authService.resetPassword(input),
  });
