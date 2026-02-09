import { IEventResponse } from '@shared/lib';

export type CopyEventForm = Omit<
  IEventResponse,
  | 'eventId'
  | 'eventStatus'
  | 'userRole'
  | 'users'
  | 'eventStartDate'
  | 'eventEndDate'
>;

export interface CopyEventModalProps {
  event: IEventResponse;
  onClose: () => void;
}
