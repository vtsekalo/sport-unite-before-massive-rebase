import { UserRole } from './user';

export enum StatusNotification {
  new = 'NEW',
  delivered = 'DELIVERED',
  read = 'READ',
  deleted = 'DELETED',
}
export interface ICountNotifications {
  countAllActualMessages: number;
  countReadMessages: number;
}

export interface INotification {
  messageId: string;
  eventId: string;
  eventName: string;
  eventType: string;
  eventUrl: string;
  userRole: UserRole;
  createdAtNotif: string;
  statusNotif: StatusNotification;
  titleNotif: string;
  bodyNotif: string;
}
