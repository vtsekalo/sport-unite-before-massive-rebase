import { StatusNotification } from './enums';
import { UserRole } from './user';

/**
 * Статистика количества уведомлений
 * @prop countAllActualMessages - Общее количество актуальных (не заархивированных) сообщений
 * @prop countReadMessages - Количество уже прочитанных пользователем сообщений
 */
export interface ICountNotifications {
  countAllActualMessages: number;
  countReadMessages: number;
}
/**
 * Сущность системного уведомления
 * @prop messageId - Идентификатор сообщения, инициировавшего уведомление
 * @prop eventId - Идентификатор связанного события
 * @prop eventName - Название мероприятия
 * @prop eventType - Тип или категория мероприятия
 * @prop eventUrl - Ссылка на страницу события для перехода
 * @prop userRole - Роль пользователя в рамках данного события (UserRole)
 * @prop createdAtNotif - Дата и время формирования уведомления
 * @prop statusNotif - Текущий статус прочтения или доставки (StatusNotification)
 * @prop titleNotif - Заголовок уведомления для отображения в UI
 * @prop bodyNotif - Основной текст (содержимое) уведомления
 */
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
