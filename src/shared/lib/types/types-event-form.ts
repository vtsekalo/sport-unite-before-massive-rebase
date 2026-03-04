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
  eventDescription: string;
  countUsers?: number;
  eventPhoto: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
