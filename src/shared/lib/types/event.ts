import { EventScope, EventStatus } from './enums';
import { CoordinateFilterDto, Coordinates, CoordinatesTuple } from './map';
import { IUserParticipant } from './user';

/**
 * @prop eventTypes - Массив типов событий
 * @prop eventStatuses - Массив статусов событий
 * @prop eventStartDate - Дата события (ISO 8601, формат: YYYY-MM-DD)
 * @prop scope - Фильтр событий. Все события или мои события (участник, организатор)
 * @prop coordinateFilterDto - Территория с которой собираются данные о событиях
 */
export interface EventSearchRequest {
  eventTypes?: string[];
  eventStatuses: EventStatus[];
  eventStartDate?: string;
  scope: EventScope;
  coordinateFilterDto: CoordinateFilterDto;
}

/**
 * @prop eventId - Идентификатор события
 * @prop userId - Идентификатор пользователя
 * @prop eventName - Название события
 * @prop eventType - Тип события
 * @prop eventStatus - Статус события
 * @prop eventStartDateTime - Дата и время начала события
 * @prop eventStartDate - Дата начала события
 * @prop eventEndDate - Дата окончания события
 * @prop eventLocation - Место проведения события
 * @prop eventDescription - Описание события
 * @prop eventPhoto - URL фото события
 * @prop userRole - Роль пользователя в событии
 * @prop coordinates - Координаты события
 * @prop users - Участники события
 * @prop countUsers - Количество / лимит участников
 */
export interface IEventResponse {
  eventId: string;
  userId: string;
  eventName: string;
  eventType: string;
  eventStatus: EventStatus;
  eventStartDateTime: string;
  eventStartDate: string;
  eventEndDate: string;
  eventLocation: string;
  eventDescription: string;
  eventPhoto: string;
  userRole: boolean;
  coordinates: Coordinates;
  users: IUserParticipant[];
  countUsers: number;
}

/**
 * @prop eventId - Уникальный идентификатор события
 * @prop eventName - Название события
 * @prop eventLocation - Место проведения события
 * @prop eventType - Наименование типа события
 * @prop eventStatus - Статус события
 * @prop eventStartDate - Дата и время начала события
 * @prop eventEndDate - Дата и время окончания события
 * @prop countUsers - Максимальное количество участников
 * @prop eventDescription - Описание события
 * @prop eventPhoto - URL фото события
 * @prop coordinates - Координаты события
 * @prop users - Список участников (включая организатора)
 */
export interface IEvent {
  userId?: string;
  eventId: string;
  eventName: string;
  eventLocation: string;
  eventType: string;
  eventStatus: EventStatus;
  eventStartDate: string;
  eventEndDate: string;
  countUsers: number;
  eventDescription: string;
  userRole?: boolean;
  eventPhoto: string;
  coordinates: Coordinates;
  users: IUserParticipant[];
}

/**
 * @prop events - Список найденных событий
 */
export interface EventSearchResponse {
  events: IEventResponse[];
}

/**
 * @prop typeId - Уникальный идентификатор типа события
 * @prop typeName - Название типа события
 */
export interface IEventType {
  typeId: number;
  typeName: string;
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
 * @prop eventId - Идентификатор события.
 * @prop eventName - Название события.
 * @prop eventType - Тип события.
 * @prop eventStatus - Статус события.
 * @prop eventStartDate - Дата и время начала события.
 * @prop eventEndDate - Дата и время окончания события.
 * @prop countUsers - Количество участников.
 * @prop eventDescription - Описание события.
 * @prop [eventPhoto] - Фото события.
 * @prop [eventLocation] - Место проведения.
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
  eventPhoto: string | null;
  coordinates: ICoordinate;
  userRole?: boolean;
  users: IUserParticipant[];
}

/**
 * @prop coords - Кортеж координат события [долгота, широта].
 */
export interface IEventWithCoordinates extends Omit<IEvent, 'coordinates'> {
  coords: CoordinatesTuple;
}
