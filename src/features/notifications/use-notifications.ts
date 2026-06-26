"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/auth.store";
import { notificationService } from "./notification.service";
import type { ListNotificationsQuery } from "./notification.types";

const UNREAD_COUNT_POLL_INTERVAL = 30_000;

export const useNotifications = (query: ListNotificationsQuery) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["notifications", "list", query],
    queryFn: () => notificationService.list(query, accessToken as string),
    enabled: !!accessToken,
  });
};

export const useUnreadCount = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: () => notificationService.unreadCount(accessToken as string),
    enabled: !!accessToken,
    refetchInterval: UNREAD_COUNT_POLL_INTERVAL,
  });
};

export const useMarkNotificationRead = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationService.markRead(id, accessToken as string),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

export const useMarkAllNotificationsRead = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationService.markAllRead(accessToken as string),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
