import { EventFooterMode, EventStatus } from '@shared/lib';

type Params = {
  isOrganizer: boolean;
  isParticipant: boolean;
  eventStatus: EventStatus;
};

export const getEventFooterMode = ({
  isOrganizer,
  isParticipant,
  eventStatus,
}: Params): EventFooterMode => {
  const organizer = isOrganizer && eventStatus == EventStatus.PLANNED;
  const canceled = eventStatus == EventStatus.CANCELLED;
  const completed = eventStatus == EventStatus.COMPLETED;

  if (completed) return EventFooterMode.COMPLETED;
  if (canceled) return EventFooterMode.COMPLETED;
  if (organizer) return EventFooterMode.ORGANIZER;
  if (isParticipant) return EventFooterMode.PARTICIPANT;
  return EventFooterMode.GUEST;
};
