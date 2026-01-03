import { EventStatus, IEvent } from '@shared/lib';

export const groupEventsByStatus = (events: IEvent[] | undefined) => {
  const initial: Record<EventStatus, IEvent[]> = {
    [EventStatus.PLANNED]: [],
    [EventStatus.IN_PROCESS]: [],
    [EventStatus.COMPLETED]: [],
    [EventStatus.CANCELLED]: [],
  };

  events?.forEach((event) => {
    if (initial[event.eventStatus]) {
      initial[event.eventStatus].push(event);
    }
  });

  return {
    active: [
      ...initial[EventStatus.IN_PROCESS],
      ...initial[EventStatus.PLANNED],
    ],
    completed: initial[EventStatus.COMPLETED],
    cancelled: initial[EventStatus.CANCELLED],
  };
};
