"use client";

import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/auth.store";
import { profileService } from "./profile.service";
import type { ChangePasswordInput, UpdateProfileInput } from "./profile.types";

export const useUpdateProfile = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (input: UpdateProfileInput) => {
      if (!accessToken) throw new Error("Not authenticated");
      return profileService.updateProfile(input, accessToken);
    },
    onSuccess: (user) => setUser(user),
  });
};

export const useChangePassword = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useMutation({
    mutationFn: (input: ChangePasswordInput) => {
      if (!accessToken) throw new Error("Not authenticated");
      return profileService.changePassword(input, accessToken);
    },
  });
};
