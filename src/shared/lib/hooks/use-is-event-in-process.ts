import { EventStatus, IEvent } from '@shared/lib';

export const useIsEventInProcess = (event: IEvent): boolean => {
  if (event.eventStatus === EventStatus.PLANNED) return true;
  if (event.eventStatus === EventStatus.COMPLETED) return true;
  return false;
};
