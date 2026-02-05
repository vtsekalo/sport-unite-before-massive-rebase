import { IEventDetailed } from '@shared/lib';

export type CopyEventForm = Omit<
  IEventDetailed,
  | 'eventId'
  | 'eventStatus'
  | 'userRole'
  | 'users'
  | 'eventStartDate'
  | 'eventEndDate'
>;

export interface CopyEventModalProps {
  event: IEventDetailed;
  onClose: () => void;
}
