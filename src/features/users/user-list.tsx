"use client";

import { useEffect, useState } from "react";
import { ApiClientError } from "@/services/api";
import type { Role } from "@/features/auth/auth.types";
import { useUsers } from "./use-users";
import { UsersFilters } from "./users-filters";
import { UsersPagination } from "./users-pagination";
import { UsersTable } from "./users-table";

const PAGE_SIZE = 10;

export function UserList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [role, setRole] = useState<Role | "all">("all");

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, role]);

  const { data, isLoading, isError, error } = useUsers({
    page,
    limit: PAGE_SIZE,
    search: debouncedSearch || undefined,
    role: role === "all" ? undefined : role,
  });

  return (
    <div className="flex flex-col gap-4">
      <UsersFilters search={search} onSearchChange={setSearch} role={role} onRoleChange={setRole} />

      {isError && (
        <p className="text-sm text-destructive">
          {error instanceof ApiClientError ? error.message : "Failed to load users."}
        </p>
      )}

      <div className="rounded-xl border">
        <UsersTable users={data?.items ?? []} isLoading={isLoading} />
      </div>

      {data && data.meta.total > 0 && (
        <UsersPagination meta={data.meta} onPageChange={setPage} />
      )}
    </div>
  );
}
