"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/auth.store";
import { customerService } from "./customer.service";
import type { ListCustomersQuery } from "./customer.types";

export const useCustomers = (query: ListCustomersQuery) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["customers", query],
    queryFn: () => customerService.list(query, accessToken as string),
    enabled: !!accessToken,
    placeholderData: (previousData) => previousData,
  });
};
