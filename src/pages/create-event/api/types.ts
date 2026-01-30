import { ICoordinate } from '@shared/lib';

export interface UploadPhotoRequest {
  id: string;
  photoType: 'USER' | 'EVENT';
  file: File;
}

export interface UploadPhotoResponse {
  photoUrl: string;
  filename: string;
  filesize: number;
  contentType: string;
}

export interface CreateEventFormData {
  eventType: string;
  eventName: string;
  eventLocation: string;
  eventStartDate: string;
  eventStartTime: string;
  eventEndDate: string;
  eventEndTime: string;
  countUsers: number;
  eventDescription: string;
  eventPhoto?: File | null;
  coordinates: ICoordinate;
}
