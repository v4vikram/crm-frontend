import { apiClient } from "@/services/api";
import type { PaginatedResult } from "@/types/api";
import type {
  AssignableUser,
  CreateUserInput,
  ListUsersQuery,
  UpdateUserInput,
  User,
} from "./user.types";

export const userService = {
  create: (input: CreateUserInput, accessToken: string) =>
    apiClient.post<User>("/users", input, { accessToken }),

  update: (id: string, input: UpdateUserInput, accessToken: string) =>
    apiClient.patch<User>(`/users/${id}`, input, { accessToken }),

  delete: (id: string, accessToken: string) =>
    apiClient.delete<null>(`/users/${id}`, { accessToken }),

  list: (query: ListUsersQuery, accessToken: string) => {
    const params = new URLSearchParams();
    params.set("page", String(query.page));
    params.set("limit", String(query.limit));
    if (query.search) params.set("search", query.search);
    if (query.role) params.set("role", query.role);

    return apiClient.get<PaginatedResult<User>>(`/users?${params.toString()}`, { accessToken });
  },

  lookup: (accessToken: string) =>
    apiClient.get<AssignableUser[]>("/users/lookup", { accessToken }),
};
