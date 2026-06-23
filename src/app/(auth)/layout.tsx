import { ThemeToggle } from "@/components/layout/theme-toggle";
import { RouteGuard } from "@/features/auth/route-guard";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard mode="guest-only">
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className="flex items-center justify-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary font-heading font-semibold text-primary-foreground">
              C
            </div>
            <span className="font-heading text-lg font-semibold">CRM</span>
          </div>
          {children}
        </div>
      </div>
    </RouteGuard>
  );
}
