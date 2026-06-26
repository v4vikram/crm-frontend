"use client";

import { RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiClientError } from "@/services/api";
import { useDashboardInsight } from "./use-ai";

export function DashboardInsightCard() {
  const { data, isLoading, isFetching, isError, error, refetch } = useDashboardInsight();

  return (
    <Card className="border-violet-200 bg-violet-50/50 dark:border-violet-900 dark:bg-violet-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-violet-900 dark:text-violet-200">
          <span className="flex size-6 items-center justify-center rounded-full bg-violet-600 text-white">
            <Sparkles className="size-3.5" />
          </span>
          AI daily insight
        </CardTitle>
        <CardAction>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Regenerate insight"
            onClick={() => refetch()}
            disabled={isFetching}
            className="text-violet-700 hover:bg-violet-100 hover:text-violet-900 dark:text-violet-300 dark:hover:bg-violet-900"
          >
            <RefreshCw className={isFetching ? "size-4 animate-spin" : "size-4"} />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full bg-violet-200/60 dark:bg-violet-900/40" />
            <Skeleton className="h-4 w-5/6 bg-violet-200/60 dark:bg-violet-900/40" />
            <Skeleton className="h-4 w-2/3 bg-violet-200/60 dark:bg-violet-900/40" />
          </div>
        )}

        {isError && (
          <p className="text-sm text-destructive">
            {error instanceof ApiClientError ? error.message : "Failed to generate insight."}
          </p>
        )}

        {!isLoading && !isError && (
          <p className="text-sm font-medium text-violet-950 dark:text-violet-100">{data?.summary}</p>
        )}
      </CardContent>
    </Card>
  );
}
