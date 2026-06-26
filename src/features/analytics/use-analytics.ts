"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/auth.store";
import { analyticsService } from "./analytics.service";

export const useAnalyticsOverview = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["analytics", "overview"],
    queryFn: () => analyticsService.overview(accessToken as string),
    enabled: !!accessToken,
  });
};
