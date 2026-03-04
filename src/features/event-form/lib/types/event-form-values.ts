import { ICoordinate } from '@shared/lib';

/**
 * Базовые данные формы события (общие поля)
 * @prop eventType - Наименование типа события
 * @prop eventName - Название события
 * @prop eventLocation - Место проведения события
 * @prop eventStartDate - Дата начала события (формат: YYYY-MM-DD)
 * @prop eventStartTime - Время начала события (формат: HH:mm)
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
  eventEndTime: string;
  countUsers?: number;
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
