"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/auth.store";
import { ApiClientError } from "@/services/api";
import { userService } from "./user.service";
import type { CreateUserInput, UpdateUserInput } from "./user.types";

const errorMessage = (error: unknown, fallback: string) =>
  error instanceof ApiClientError ? error.message : fallback;

export const useCreateUser = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateUserInput) => userService.create(input, accessToken as string),
    onSuccess: () => {
      toast.success("Employee created");
      void queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => toast.error(errorMessage(error, "Failed to create employee")),
  });
};

export const useUpdateUser = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateUserInput }) =>
      userService.update(id, input, accessToken as string),
    onSuccess: () => {
      toast.success("Employee updated");
      void queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => toast.error(errorMessage(error, "Failed to update employee")),
  });
};

export const useDeleteUser = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.delete(id, accessToken as string),
    onSuccess: () => {
      toast.success("Employee deleted");
      void queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => toast.error(errorMessage(error, "Failed to delete employee")),
  });
};
