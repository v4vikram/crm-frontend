"use client";

import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { SourceBucket } from "./analytics.types";

interface LeadsSourceChartProps {
  data: SourceBucket[];
}

export function LeadsSourceChart({ data }: LeadsSourceChartProps) {
  const filtered = data.filter((bucket) => bucket.count > 0);

  const chartConfig: ChartConfig = filtered.reduce((config, bucket, index) => {
    config[bucket.source] = {
      label: bucket.source.replace(/_/g, " "),
      color: `var(--chart-${(index % 5) + 1})`,
    };
    return config;
  }, {} as ChartConfig);

  const chartData = filtered.map((bucket) => ({
    source: bucket.source,
    count: bucket.count,
    fill: `var(--color-${bucket.source})`,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads by source</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">No lead data yet.</p>
        ) : (
          <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="source" />} />
              <Pie data={chartData} dataKey="count" nameKey="source" innerRadius={50} />
              <ChartLegend content={<ChartLegendContent nameKey="source" />} />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
