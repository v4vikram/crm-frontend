"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/auth.store";
import { leadService } from "./lead.service";
import type { ListLeadsQuery } from "./lead.types";

export const useLeads = (query: ListLeadsQuery) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["leads", query],
    queryFn: () => leadService.list(query, accessToken as string),
    enabled: !!accessToken,
    placeholderData: (previousData) => previousData,
  });
};
