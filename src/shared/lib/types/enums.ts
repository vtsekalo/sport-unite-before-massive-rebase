/**
 * Пол
 */
export enum GenderVariant {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
/**
 * Статус профиля
 */
export enum UserStatusVariant {
  ACTIVE = 'ACTIVE',
  NOT_ACTIVE = 'NOT_ACTIVE',
  BLOCKED = 'BLOCKED',
  DELETED = 'DELETED',
}

/**
 * PLANNED - Запланировано.
 * IN_PROCESS - В процессе.
 * COMPLETED - Завешено
 * CANCELLED - Отменено
 */

export enum EventStatus {
  PLANNED = 'PLANNED',
  IN_PROCESS = 'IN_PROCESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

/**
 * ALL - Все.
 * ORGANIZER - Организатор.
 * PARTICIPANT - Участник
 */

export enum EventScope {
  ALL = 'ALL',
  ORGANIZER = 'ORGANIZER',
  PARTICIPANT = 'PARTICIPANT',
}

/**
 * IN_PROGRESS - В процессе.
 * ORGANIZER - Организатор.
 * PARTICIPANT - Участник
 * GUEST - Неавторизированный пользователь
 */
export enum EventFooterMode {
  ORGANIZER = 'ORGANIZER',
  PARTICIPANT = 'PARTICIPANT',
  GUEST = 'GUEST',
  COMPLETED = 'COMPLETED',
}

/**
 * Жизненный цикл (статусы) уведомления
 * @enum NEW - Новое уведомление, созданное в системе
 * @enum DELIVERED - Уведомление успешно доставлено на устройство пользователя
 * @enum READ - Уведомление было открыто или прочитано пользователем
 * @enum DELETED - Уведомление удалено или отправлено в архив
 */
export enum StatusNotification {
  new = 'NEW',
  delivered = 'DELIVERED',
  read = 'READ',
  deleted = 'DELETED',
}
