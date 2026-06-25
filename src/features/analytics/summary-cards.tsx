import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { AnalyticsSummary } from "./analytics.types";

interface SummaryCardsProps {
  summary: AnalyticsSummary;
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  const cards = [
    { label: "Total leads", value: summary.totalLeads },
    { label: "Open leads", value: summary.openLeads },
    { label: "Won leads", value: summary.wonLeads },
    { label: "Conversion rate", value: `${summary.conversionRate}%` },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardHeader>
            <CardDescription>{card.label}</CardDescription>
            <CardTitle className="text-2xl">{card.value}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
