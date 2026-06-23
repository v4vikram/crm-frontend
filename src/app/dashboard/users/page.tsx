"use client";

import { useAuthStore } from "@/features/auth/auth.store";
import { UserList } from "@/features/users/user-list";

export default function UsersPage() {
  const role = useAuthStore((state) => state.user?.role);

  if (role !== "ADMIN") {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          You don&apos;t have permission to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">Users</h1>
        <p className="text-sm text-muted-foreground">Manage everyone with access to this CRM.</p>
      </div>
      <UserList />
    </div>
  );
}
