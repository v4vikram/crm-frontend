"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "./auth.store";

interface RouteGuardProps {
  mode: "protected" | "guest-only";
  children: React.ReactNode;
}

export function RouteGuard({ mode, children }: RouteGuardProps) {
  const status = useAuthStore((state) => state.status);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (mode === "protected" && status === "guest") {
      router.replace("/login");
    }
    if (mode === "guest-only" && status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, mode, router]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center text-sm text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (mode === "protected" && status !== "authenticated") return null;
  if (mode === "guest-only" && status !== "guest") return null;

  return children;
}
