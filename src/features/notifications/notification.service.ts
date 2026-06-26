import { apiClient } from "@/services/api";
import type { PaginatedResult } from "@/types/api";
import type { ListNotificationsQuery, Notification } from "./notification.types";

export const notificationService = {
  list: (query: ListNotificationsQuery, accessToken: string) => {
    const params = new URLSearchParams();
    params.set("page", String(query.page));
    params.set("limit", String(query.limit));
    if (query.unreadOnly) params.set("unreadOnly", "true");

    return apiClient.get<PaginatedResult<Notification>>(`/notifications?${params.toString()}`, {
      accessToken,
    });
  },

  unreadCount: (accessToken: string) =>
    apiClient.get<{ count: number }>("/notifications/unread-count", { accessToken }),

  markRead: (id: string, accessToken: string) =>
    apiClient.patch<null>(`/notifications/${id}/read`, undefined, { accessToken }),

  markAllRead: (accessToken: string) =>
    apiClient.patch<null>("/notifications/read-all", undefined, { accessToken }),
};
