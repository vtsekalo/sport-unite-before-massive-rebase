export enum GenderVariant {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

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
