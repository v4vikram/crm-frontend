"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { StatusBucket } from "./analytics.types";

const chartConfig: ChartConfig = {
  count: { label: "Leads", color: "var(--chart-1)" },
};

interface LeadsStatusChartProps {
  data: StatusBucket[];
}

export function LeadsStatusChart({ data }: LeadsStatusChartProps) {
  const chartData = data.map((bucket) => ({
    status: bucket.status.replace(/_/g, " "),
    count: bucket.count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads by status</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="status"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
              angle={-25}
              textAnchor="end"
              height={50}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="var(--color-count)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
