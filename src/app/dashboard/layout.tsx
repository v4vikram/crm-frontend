import { AppSidebar } from "@/components/layout/app-sidebar";
import { Topbar } from "@/components/layout/topbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { RouteGuard } from "@/features/auth/route-guard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard mode="protected">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Topbar />
          <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </RouteGuard>
  );
}
