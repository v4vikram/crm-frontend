import { apiClient } from "@/services/api";
import type { AuthUser } from "@/features/auth/auth.types";
import type { ChangePasswordInput, UpdateProfileInput } from "./profile.types";

export const profileService = {
  updateProfile: (input: UpdateProfileInput, accessToken: string) =>
    apiClient.patch<AuthUser>("/users/profile", input, { accessToken }),
  changePassword: (input: ChangePasswordInput, accessToken: string) =>
    apiClient.patch<null>("/users/profile/password", input, { accessToken }),
};
