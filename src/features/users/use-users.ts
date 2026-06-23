"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/auth.store";
import { userService } from "./user.service";
import type { ListUsersQuery } from "./user.types";

export const useUsers = (query: ListUsersQuery) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["users", query],
    queryFn: () => userService.list(query, accessToken as string),
    enabled: !!accessToken,
    placeholderData: (previousData) => previousData,
  });
};
