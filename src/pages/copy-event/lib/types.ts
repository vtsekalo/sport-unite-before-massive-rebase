import { IEvent } from '@shared/lib';

export type CopyEventForm = Omit<
  IEvent,
  | 'eventId'
  | 'eventStatus'
  | 'userRole'
  | 'users'
  | 'eventStartDate'
  | 'eventEndDate'
>;

export interface CopyEventPageProps {
  event: IEvent;
  onClose: () => void;
}
