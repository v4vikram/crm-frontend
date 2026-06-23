"use client";

import {
  CheckSquare,
  LayoutDashboard,
  Paperclip,
  ShieldCheck,
  StickyNote,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/features/auth/auth.store";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Leads", url: "/dashboard/leads", icon: UserPlus },
  { title: "Customers", url: "/dashboard/customers", icon: Users },
  { title: "Tasks", url: "/dashboard/tasks", icon: CheckSquare },
  { title: "Notes", url: "/dashboard/notes", icon: StickyNote },
  { title: "Attachments", url: "/dashboard/attachments", icon: Paperclip },
  { title: "Users", url: "/dashboard/users", icon: ShieldCheck, adminOnly: true },
];

export function AppSidebar() {
  const pathname = usePathname();
  const role = useAuthStore((state) => state.user?.role);
  const visibleNavItems = navItems.filter((item) => !item.adminOnly || role === "ADMIN");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary font-heading font-semibold text-primary-foreground">
            C
          </div>
          <span className="font-heading font-semibold group-data-[collapsible=icon]:hidden">CRM</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleNavItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
