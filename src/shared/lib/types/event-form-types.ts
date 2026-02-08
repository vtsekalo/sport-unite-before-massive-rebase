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
