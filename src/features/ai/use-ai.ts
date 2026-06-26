"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/auth.store";
import { aiService } from "./ai.service";

const STALE_TIME = 10 * 60 * 1000;

export const useDashboardInsight = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["ai", "dashboard-insight"],
    queryFn: () => aiService.dashboardInsight(accessToken as string),
    enabled: !!accessToken,
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false,
  });
};

export const useSalesPerformance = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["ai", "sales-performance"],
    queryFn: () => aiService.salesPerformance(accessToken as string),
    enabled: !!accessToken,
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false,
  });
};
