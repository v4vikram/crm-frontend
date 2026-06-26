import { apiClient } from "@/services/api";
import type { PaginatedResult } from "@/types/api";
import type {
  ConvertLeadInput,
  Customer,
  ListCustomersQuery,
  UpdateCustomerInput,
} from "./customer.types";

export const customerService = {
  list: (query: ListCustomersQuery, accessToken: string) => {
    const params = new URLSearchParams();
    params.set("page", String(query.page));
    params.set("limit", String(query.limit));
    if (query.search) params.set("search", query.search);
    if (query.status) params.set("status", query.status);

    return apiClient.get<PaginatedResult<Customer>>(`/customers?${params.toString()}`, {
      accessToken,
    });
  },

  convertFromLead: (leadId: string, input: ConvertLeadInput, accessToken: string) =>
    apiClient.post<Customer>(`/customers/from-lead/${leadId}`, input, { accessToken }),

  update: (id: string, input: UpdateCustomerInput, accessToken: string) =>
    apiClient.patch<Customer>(`/customers/${id}`, input, { accessToken }),

  delete: (id: string, accessToken: string) =>
    apiClient.delete<null>(`/customers/${id}`, { accessToken }),
};
