export type NotificationType = "LEAD_CREATED";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  entityType: string | null;
  entityId: string | null;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
}

export interface ListNotificationsQuery {
  page: number;
  limit: number;
  unreadOnly?: boolean;
}
