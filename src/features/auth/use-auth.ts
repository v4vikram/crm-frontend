"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: LoginInput) => authService.login(input),
    onSuccess: ({ user, accessToken }) => {
      queryClient.clear();
      setSession(user, accessToken);
    },
  });
};

export const useRegister = () => {
  const setSession = useAuthStore((state) => state.setSession);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: RegisterInput) => authService.register(input),
    onSuccess: ({ user, accessToken }) => {
      queryClient.clear();
      setSession(user, accessToken);
    },
  });
};

export const useLogout = () => {
  const clearSession = useAuthStore((state) => state.clearSession);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearSession();
      queryClient.clear();
    },
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
