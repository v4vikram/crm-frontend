"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/auth.store";
import { ApiClientError } from "@/services/api";
import { leadService } from "./lead.service";
import type { CreateLeadInput, UpdateLeadInput } from "./lead.types";

const errorMessage = (error: unknown, fallback: string) =>
  error instanceof ApiClientError ? error.message : fallback;

export const useCreateLead = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateLeadInput) => leadService.create(input, accessToken as string),
    onSuccess: () => {
      toast.success("Lead created");
      void queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
    onError: (error) => toast.error(errorMessage(error, "Failed to create lead")),
  });
};

export const useUpdateLead = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateLeadInput }) =>
      leadService.update(id, input, accessToken as string),
    onSuccess: () => {
      toast.success("Lead updated");
      void queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
    onError: (error) => toast.error(errorMessage(error, "Failed to update lead")),
  });
};

export const useDeleteLead = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => leadService.delete(id, accessToken as string),
    onSuccess: () => {
      toast.success("Lead deleted");
      void queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
    onError: (error) => toast.error(errorMessage(error, "Failed to delete lead")),
  });
};
