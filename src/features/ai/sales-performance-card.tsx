"use client";

import { RefreshCw, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiClientError } from "@/services/api";
import { useSalesPerformance } from "./use-ai";

export function SalesPerformanceCard() {
  const { data, isLoading, isFetching, isError, error, refetch } = useSalesPerformance();

  return (
    <Card className="border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200">
          <span className="flex size-6 items-center justify-center rounded-full bg-emerald-600 text-white">
            <TrendingUp className="size-3.5" />
          </span>
          AI sales performance
        </CardTitle>
        <CardAction>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Regenerate analysis"
            onClick={() => refetch()}
            disabled={isFetching}
            className="text-emerald-700 hover:bg-emerald-100 hover:text-emerald-900 dark:text-emerald-300 dark:hover:bg-emerald-900"
          >
            <RefreshCw className={isFetching ? "size-4 animate-spin" : "size-4"} />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full bg-emerald-200/60 dark:bg-emerald-900/40" />
            <Skeleton className="h-4 w-5/6 bg-emerald-200/60 dark:bg-emerald-900/40" />
            <Skeleton className="h-4 w-3/4 bg-emerald-200/60 dark:bg-emerald-900/40" />
          </div>
        )}

        {isError && (
          <p className="text-sm text-destructive">
            {error instanceof ApiClientError ? error.message : "Failed to generate analysis."}
          </p>
        )}

        {!isLoading && !isError && data && data.employees.length === 0 && (
          <p className="text-sm text-emerald-800 dark:text-emerald-200">No team members with leads yet.</p>
        )}

        {!isLoading && !isError && data && data.employees.length > 0 && (
          <ul className="flex flex-col gap-2">
            {data.analysis
              .split("\n")
              .map((line) => line.trim())
              .filter(Boolean)
              .map((line, index) => {
                const separatorIndex = line.indexOf(":");
                const hasName = separatorIndex > -1;
                const name = hasName ? line.slice(0, separatorIndex) : null;
                const suggestion = hasName ? line.slice(separatorIndex + 1).trim() : line;

                return (
                  <li key={index} className="flex gap-2 text-sm">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                    <span className="text-emerald-950 dark:text-emerald-100">
                      {name && (
                        <span className="font-bold text-emerald-700 dark:text-emerald-300">{name}: </span>
                      )}
                      {suggestion}
                    </span>
                  </li>
                );
              })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
