import { ICoordinate } from '../types';

// Базовые данные формы события (общие поля)
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

// Для создания нового события (eventPhoto - это File)
export interface CreateEventFormData extends BaseEventFormData {
  eventPhoto?: File | null;
}

// Для инициализации формы из существующего события (eventPhoto - это string URL или File)
export interface EventFormInitialData extends BaseEventFormData {
  eventPhoto?: string | File | null;
}

export interface UploadPhotoRequest {
  id: string;
  photoType: PhotoOwner;
  file: File;
}

export enum PhotoOwner {
  EVENT = 'EVENT',
  USER = 'USER',
}

export interface UploadPhotoResponse {
  url: string;
}

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

export enum PhotoVariant {
  CREATE = 'create',
  COPY = 'copy',
}
