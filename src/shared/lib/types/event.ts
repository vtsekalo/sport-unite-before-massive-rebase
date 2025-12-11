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
 *  @prop eventDescription - Описание события
 *  @prop eventPhoto - URL фото события
 *  @prop userRole - Роль пользователя в событии. true - организатор, false - участник
 *  @prop coordinates - Координаты события
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
