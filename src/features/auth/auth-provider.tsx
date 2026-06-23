"use client";

import { useEffect, useRef } from "react";
import { useBootstrapSession } from "./use-auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const bootstrap = useBootstrapSession();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    void bootstrap();
  }, [bootstrap]);

  return children;
}
