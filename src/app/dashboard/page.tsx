import { AiInsights } from "@/features/ai/ai-insights";
import { AnalyticsOverview } from "@/features/analytics/analytics-overview";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">An overview of your leads and team activity.</p>
      </div>

      <AiInsights />
      <AnalyticsOverview />
    </div>
  );
}
