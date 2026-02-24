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

export interface CopyEventPageProps {
  event: IEventDetailed;
  onClose: () => void;
}
