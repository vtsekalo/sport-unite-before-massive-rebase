import { EventScope, EventStatus } from './enums';

/**
 * @prop latitude - Широта
 * @prop longitude - Долгота
 * @prop range - Радиус в метрах
 */
export interface CoordinateFilterDto {
  latitude: number;
  longitude: number;
  range: number;
}

/**
 * @prop eventTypes - Массив типов событий
 * @prop eventStatuses - Массив статусов событий
 * @prop eventStartDate - Дата  и время события (ISO 8601)
 * @prop scope - Фильтр событий. Все события или мои события (участник, организатор)
 * @prop coordinateFilterDto - Территория с которой собираются данные о событиях
 */
export interface EventSearchRequest {
  eventTypes?: string[];
  eventStatuses: EventStatus[];
  eventStartDateTime?: string;
  scope: EventScope;
  coordinateFilterDto: CoordinateFilterDto;
}

/**
 * @prop latitude - Широта
 * @prop longitude - Долгота
 */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * @prop eventId - Уникальный идентификатор события
 * @prop userId - 	Уникальный идентификатор пользователя в системе управления доступом
 * @prop eventName - Название события
 * @prop eventType - 	Наименование типа события
 * @prop eventStartDateTime - Дата и время начала события
 * @prop eventDescription - Описание события
 * @prop eventPhoto - URL фото события
 * @prop userRole - Роль пользователя в событии. true - организатор, false - участник
 * @prop coordinates - Координаты события
 */
export interface IEvent {
  eventId: string;
  userId: string;
  eventName: string;
  eventType: string;
  eventStartDateTime: string; // ISO 8601 date-time
  eventDescription: string;
  eventPhoto: string;
  userRole: boolean;
  coordinates: Coordinates;
}

/**
 * @prop EventResponse - Массив найденных событий
 */
export interface EventSearchResponse {
  events: IEvent[];
}

/**
 * @prop typeId - Уникальный идентификатор типа события
 * @prop typeName - Название типа события
 */
export interface IEventType {
  typeId: number;
  typeName: string;
}

// ============================================================================
// Дополнительные типы из твоего файла
// ============================================================================

/**
 * @prop userCode - Уникальный код пользователя.
 * @prop nickname - Никнейм пользователя.
 * @prop [urlUserPhoto] - Ссылка на фото пользователя.
 */
export interface IUserParticipant {
  userCode: string;
  nickname: string;
  urlUserPhoto?: string | null;
}

/**
 * @prop latitude - Широта.
 * @prop longitude - Долгота.
 */
export interface ICoordinate {
  latitude: number;
  longitude: number;
}

/**
 * Кортеж координат: [долгота, широта]
 */
export type CoordinatesTuple = [longitude: number, latitude: number];

/**
 * @prop eventId - Идентификатор события.
 * @prop eventName - Название события.
 * @prop eventType - Тип события.
 * @prop eventStatus - Статус события.
 * @prop eventStartDate - Дата и время начала события.
 * @prop eventEndDate - Дата и время окончания события.
 * @prop countUsers - Количество участников.
 * @prop eventDescription - Описание события.
 * @prop [eventPhoto] - Фото события.
 * @prop coordinates - Координаты события.
 * @prop users - Список участников.
 */
export interface IEventDetailed {
  eventId: string;
  eventName: string;
  eventType: string;
  eventStatus: EventStatus;
  eventStartDate: string;
  eventEndDate: string;
  countUsers: number;
  eventDescription: string;
  eventLocation?: string;
  eventPhoto?: string | null;
  coordinates: ICoordinate;
  users: IUserParticipant[];
}

/**
 * @prop coords - Кортеж координат события [долгота, широта].
 */
export interface IEventWithCoordinates
  extends Omit<IEventDetailed, 'coordinates'> {
  coords: CoordinatesTuple;
}

/**
 * @prop eventId - Идентификатор события.
 * @prop eventType - Тип события.
 * @prop startDate - Дата начала события.
 * @prop coordinates - Координаты события.
 */
export interface IEventSearchResponse {
  eventId: string;
  eventType: string;
  startDate: string;
  coordinates: ICoordinate;
}

/**
 * @prop [eventTypes] - Фильтр по типам событий.
 * @prop [eventStatuses] - Фильтр по статусам событий.
 * @prop [eventStartDate] - Дата начала события.
 * @prop [coordinateFilterDto] - Фильтр по координатам.
 */
export interface IGetEventsParams {
  eventTypes?: string[];
  eventStatuses?: string[];
  eventStartDate?: string | null;
  coordinateFilterDto?: {
    latitude: number;
    longitude: number;
    range: number;
  };
}
