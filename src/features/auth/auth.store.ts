import { create } from "zustand";
import type { AuthUser } from "./auth.types";

type SessionStatus = "loading" | "authenticated" | "guest";

interface AuthState {
  status: SessionStatus;
  user: AuthUser | null;
  accessToken: string | null;
  setSession: (user: AuthUser, accessToken: string) => void;
  setUser: (user: AuthUser) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  status: "loading",
  user: null,
  accessToken: null,
  setSession: (user, accessToken) => set({ status: "authenticated", user, accessToken }),
  setUser: (user) => set({ user }),
  clearSession: () => set({ status: "guest", user: null, accessToken: null }),
}));
