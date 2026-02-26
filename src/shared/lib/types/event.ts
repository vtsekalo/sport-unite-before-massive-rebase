import { EventScope, EventStatus } from './enums';
import { CoordinateFilterDto, Coordinates } from './map';
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
  eventId: string;
  eventName: string;
  eventLocation: string;
  eventType: string;
  eventStatus: EventStatus;
  eventStartDate: string;
  eventEndDate: string;
  countUsers: number;
  eventDescription: string;
  eventPhoto: string;
  coordinates: Coordinates;
  users: IUserParticipant[];
}
/**
 * @prop typeId - Уникальный идентификатор типа события
 */
export type IEventWithoutCoordinates = Omit<IEvent, 'coordinates'>;
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
