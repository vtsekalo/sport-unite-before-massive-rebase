import { IEventDetailed } from '@shared/lib';

export type CreateEventRequest = Omit<
  IEventDetailed,
  'eventId' | 'users' | 'eventStatus'
>;

export interface CreateEventResponse extends CreateEventRequest {
  eventId: string;
}
