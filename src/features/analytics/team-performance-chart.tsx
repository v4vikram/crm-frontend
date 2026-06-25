"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { AssigneeBucket, TeamSummary } from "./analytics.types";

const chartConfig: ChartConfig = {
  count: { label: "Leads assigned", color: "var(--chart-1)" },
};

interface TeamPerformanceChartProps {
  byAssignee: AssigneeBucket[];
  team: TeamSummary;
}

export function TeamPerformanceChart({ byAssignee, team }: TeamPerformanceChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team performance</CardTitle>
        <CardDescription>
          {team.totalUsers} team members &middot; {team.admins} admin{team.admins === 1 ? "" : "s"} &middot;{" "}
          {team.members} member{team.members === 1 ? "" : "s"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {byAssignee.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">No leads assigned yet.</p>
        ) : (
          <ChartContainer config={chartConfig} className="aspect-auto h-72 w-full">
            <BarChart data={byAssignee} layout="vertical" margin={{ left: 16 }}>
              <CartesianGrid horizontal={false} />
              <XAxis type="number" tickLine={false} axisLine={false} allowDecimals={false} />
              <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={110} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="var(--color-count)" radius={4} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
