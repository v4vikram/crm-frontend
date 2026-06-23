import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Renamed from `middleware.ts` in Next.js 16 — see https://nextjs.org/docs/app/api-reference/file-conventions/proxy
// No-op until auth-gated routes are added.
export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
