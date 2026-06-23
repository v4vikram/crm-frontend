import { apiClient } from "@/services/api";
import type { PaginatedResult } from "@/types/api";
import type { CreateLeadInput, Lead, ListLeadsQuery, UpdateLeadInput } from "./lead.types";

export const leadService = {
  list: (query: ListLeadsQuery, accessToken: string) => {
    const params = new URLSearchParams();
    params.set("page", String(query.page));
    params.set("limit", String(query.limit));
    if (query.search) params.set("search", query.search);
    if (query.status) params.set("status", query.status);
    if (query.source) params.set("source", query.source);

    return apiClient.get<PaginatedResult<Lead>>(`/leads?${params.toString()}`, { accessToken });
  },

  create: (input: CreateLeadInput, accessToken: string) =>
    apiClient.post<Lead>("/leads", input, { accessToken }),

  update: (id: string, input: UpdateLeadInput, accessToken: string) =>
    apiClient.patch<Lead>(`/leads/${id}`, input, { accessToken }),

  delete: (id: string, accessToken: string) =>
    apiClient.delete<null>(`/leads/${id}`, { accessToken }),
};
