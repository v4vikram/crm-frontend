import { apiClient } from "@/services/api";
import type { AnalyticsOverview } from "./analytics.types";

export const analyticsService = {
  overview: (accessToken: string) =>
    apiClient.get<AnalyticsOverview>("/analytics/overview", { accessToken }),
};
