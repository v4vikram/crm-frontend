"use client";

import { useAuthStore } from "@/features/auth/auth.store";
import { DashboardInsightCard } from "./dashboard-insight-card";
import { SalesPerformanceCard } from "./sales-performance-card";

export function AiInsights() {
  const isAdmin = useAuthStore((state) => state.user?.role === "ADMIN");

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <DashboardInsightCard />
      {isAdmin && <SalesPerformanceCard />}
    </div>
  );
}
