"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Role } from "@/features/auth/auth.types";

interface UsersFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  role: Role | "all";
  onRoleChange: (value: Role | "all") => void;
}

export function UsersFilters({ search, onSearchChange, role, onRoleChange }: UsersFiltersProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="pl-8"
        />
      </div>

      <Select
        value={role}
        onValueChange={(value) => onRoleChange(value as Role | "all")}
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All roles</SelectItem>
          <SelectItem value="ADMIN">Admin</SelectItem>
          <SelectItem value="MEMBER">Member</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
