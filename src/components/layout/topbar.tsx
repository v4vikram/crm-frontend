"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuthStore } from "@/features/auth/auth.store";
import { useLogout } from "@/features/auth/use-auth";
import { NotificationBell } from "@/features/notifications/notification-bell";
import { ThemeToggle } from "./theme-toggle";

export function Topbar() {
  const router = useRouter();
  const logout = useLogout();
  const user = useAuthStore((state) => state.user);

  const initials = user?.name?.charAt(0)?.toUpperCase() ?? "U";

  const handleLogout = () => {
    logout.mutate(undefined, { onSuccess: () => router.replace("/login") });
  };

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-4" />
      <div className="flex-1" />
      <NotificationBell />
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 rounded-md p-1 pr-2 hover:bg-accent">
          <Avatar className="size-8">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium sm:inline">{user?.name}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
