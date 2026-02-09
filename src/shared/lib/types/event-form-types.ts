import { ICoordinate } from '../types';

export interface CreateEventFormData {
  eventType: string;
  eventName: string;
  eventLocation: string;
  eventStartDate: string;
  eventStartTime: string;
  eventEndTime: string;
  countUsers: number;
  eventDescription: string;
  eventPhoto?: File | null;
  coordinates: ICoordinate;
}

export interface UploadPhotoRequest {
  id: string;
  photoType: 'EVENT' | 'USER';
  file: File;
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

