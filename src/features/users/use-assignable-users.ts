"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/auth.store";
import { userService } from "./user.service";

export const useAssignableUsers = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["users", "lookup"],
    queryFn: () => userService.lookup(accessToken as string),
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000,
  });
};
