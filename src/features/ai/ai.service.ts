import { apiClient } from "@/services/api";
import type { DashboardInsight, SalesPerformanceAnalysis } from "./ai.types";

export const aiService = {
  dashboardInsight: (accessToken: string) =>
    apiClient.get<DashboardInsight>("/ai/dashboard-insight", { accessToken }),

  salesPerformance: (accessToken: string) =>
    apiClient.get<SalesPerformanceAnalysis>("/ai/sales-performance", { accessToken }),
};
