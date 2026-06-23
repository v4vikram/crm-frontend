import type { Role } from "@/features/auth/auth.types";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}

export interface ListUsersQuery {
  page: number;
  limit: number;
  search?: string;
  role?: Role;
}
