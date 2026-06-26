"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/features/auth/auth.store";
import { ApiClientError } from "@/services/api";
import { LeadsSourceChart } from "./leads-source-chart";
import { LeadsStatusChart } from "./leads-status-chart";
import { LeadsTrendChart } from "./leads-trend-chart";
import { SummaryCards } from "./summary-cards";
import { TeamPerformanceChart } from "./team-performance-chart";
import { useAnalyticsOverview } from "./use-analytics";

export function AnalyticsOverview() {
  const isAdmin = useAuthStore((state) => state.user?.role === "ADMIN");
  const { data, isLoading, isError, error } = useAnalyticsOverview();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-24 rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <p className="text-sm text-destructive">
        {error instanceof ApiClientError ? error.message : "Failed to load analytics."}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <SummaryCards summary={data.summary} />

      <div className="grid gap-4 lg:grid-cols-2">
        <LeadsTrendChart data={data.trend} />
        <LeadsStatusChart data={data.byStatus} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <LeadsSourceChart data={data.bySource} />
        {isAdmin && data.byAssignee && data.team && (
          <TeamPerformanceChart byAssignee={data.byAssignee} team={data.team} />
        )}
      </div>
    </div>
  );
}
