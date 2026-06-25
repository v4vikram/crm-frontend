"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApiClientError } from "@/services/api";
import type { Role } from "@/features/auth/auth.types";
import { DeleteUserDialog } from "./delete-user-dialog";
import { EmployeeForm } from "./employee-form";
import type { User } from "./user.types";
import type { EmployeeFormValues } from "./user.validation";
import { useCreateUser, useDeleteUser, useUpdateUser } from "./use-user-mutations";
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
  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

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

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const openCreateForm = () => {
    setEditingUser(null);
    setFormOpen(true);
  };

  const openEditForm = (user: User) => {
    setEditingUser(user);
    setFormOpen(true);
  };

  const handleSubmit = (values: EmployeeFormValues) => {
    if (editingUser) {
      updateUser.mutate(
        { id: editingUser.id, input: { name: values.name, email: values.email, role: values.role } },
        { onSuccess: () => setFormOpen(false) },
      );
    } else {
      createUser.mutate(
        { name: values.name, email: values.email, password: values.password as string, role: values.role },
        { onSuccess: () => setFormOpen(false) },
      );
    }
  };

  const handleConfirmDelete = () => {
    if (!deletingUser) return;
    deleteUser.mutate(deletingUser.id, { onSuccess: () => setDeletingUser(null) });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <UsersFilters search={search} onSearchChange={setSearch} role={role} onRoleChange={setRole} />
        <Button onClick={openCreateForm}>
          <Plus />
          Add employee
        </Button>
      </div>

      {isError && (
        <p className="text-sm text-destructive">
          {error instanceof ApiClientError ? error.message : "Failed to load users."}
        </p>
      )}

      <div className="rounded-xl border">
        <UsersTable
          users={data?.items ?? []}
          isLoading={isLoading}
          onEdit={openEditForm}
          onDelete={setDeletingUser}
        />
      </div>

      {data && data.meta.total > 0 && (
        <UsersPagination meta={data.meta} onPageChange={setPage} />
      )}

      <EmployeeForm
        open={formOpen}
        onOpenChange={setFormOpen}
        user={editingUser}
        isPending={createUser.isPending || updateUser.isPending}
        onSubmit={handleSubmit}
      />

      <DeleteUserDialog
        user={deletingUser}
        onOpenChange={(open) => !open && setDeletingUser(null)}
        isPending={deleteUser.isPending}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
