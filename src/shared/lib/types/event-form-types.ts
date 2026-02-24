import { ICoordinate } from './event';

/**
 * Базовые данные формы события (общие поля)
 * @prop eventType - Наименование типа события
 * @prop eventName - Название события
 * @prop eventLocation - Место проведения события
 * @prop eventStartDate - Дата начала события (формат: YYYY-MM-DD)
 * @prop eventStartTime - Время начала события (формат: HH:mm)
 * @prop eventEndDate - Дата окончания события (формат: YYYY-MM-DD)
 * @prop eventEndTime - Время окончания события (формат: HH:mm)
 * @prop countUsers - Максимальное количество участников
 * @prop eventDescription - Описание события
 * @prop coordinates - Координаты события
 */
interface BaseEventFormData {
  eventType: string;
  eventName: string;
  eventLocation: string;
  eventStartDate: string;
  eventStartTime: string;
  eventEndDate: string;
  eventEndTime: string;
  countUsers: number;
  eventDescription: string;
  coordinates: ICoordinate;
}

/**
 * Данные формы для создания нового события
 * @prop eventPhoto - Файл изображения события
 */
export interface CreateEventFormData extends BaseEventFormData {
  eventPhoto?: File | null;
}

/**
 * Данные для инициализации формы из существующего события
 * @prop eventPhoto - URL изображения или файл
 */
export interface EventFormInitialData extends BaseEventFormData {
  eventPhoto?: string | File | null;
}

/**
 * Запрос на загрузку фото
 * @prop id - Идентификатор сущности (события или пользователя)
 * @prop photoType - Тип владельца фото
 * @prop file - Файл изображения
 */
export interface UploadPhotoRequest {
  id: string;
  photoType: 'EVENT';
  file: File;
}

/**
 * Ответ от API загрузки фото
 * @prop url - URL загруженного изображения
 */
export interface UploadPhotoResponse {
  url: string;
}

/**
 * Запрос на создание события
 * @prop eventType - Наименование типа события
 * @prop eventName - Название события
 * @prop eventLocation - Место проведения события
 * @prop eventStartDate - Дата и время начала события (ISO 8601)
 * @prop eventEndDate - Дата и время окончания события (ISO 8601)
 * @prop eventDescription - Описание события
 * @prop countUsers - Максимальное количество участников
 * @prop eventPhoto - URL фото события
 * @prop coordinates - Координаты события
 */
export interface CreateEventRequest {
  eventType: string;
  eventName: string;
  eventLocation: string;
  eventStartDate: string;
  eventEndDate: string;
  eventDescription: string;
  countUsers: number;
  eventPhoto: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}