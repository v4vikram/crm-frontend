"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/auth.store";
import { ApiClientError } from "@/services/api";
import { customerService } from "./customer.service";
import type { ConvertLeadInput, UpdateCustomerInput } from "./customer.types";

const errorMessage = (error: unknown, fallback: string) =>
  error instanceof ApiClientError ? error.message : fallback;

export const useConvertLead = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ leadId, input }: { leadId: string; input: ConvertLeadInput }) =>
      customerService.convertFromLead(leadId, input, accessToken as string),
    onSuccess: () => {
      toast.success("Lead converted to customer");
      void queryClient.invalidateQueries({ queryKey: ["customers"] });
      void queryClient.invalidateQueries({ queryKey: ["leads"] });
      void queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
    onError: (error) => toast.error(errorMessage(error, "Failed to convert lead")),
  });
};

export const useUpdateCustomer = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateCustomerInput }) =>
      customerService.update(id, input, accessToken as string),
    onSuccess: () => {
      toast.success("Customer updated");
      void queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error) => toast.error(errorMessage(error, "Failed to update customer")),
  });
};

export const useDeleteCustomer = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => customerService.delete(id, accessToken as string),
    onSuccess: () => {
      toast.success("Customer deleted");
      void queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error) => toast.error(errorMessage(error, "Failed to delete customer")),
  });
};
