import type { Role } from "@/features/auth/auth.types";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface UpdateUserInput {
  name: string;
  email: string;
  role: Role;
}

export interface ListUsersQuery {
  page: number;
  limit: number;
  search?: string;
  role?: Role;
}

export interface AssignableUser {
  id: string;
  name: string;
  email: string;
}
