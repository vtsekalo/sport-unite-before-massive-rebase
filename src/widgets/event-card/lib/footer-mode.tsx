import { EventFooterMode } from '@shared/lib';

type Params = {
  isEventPlanned: boolean;
  isOrganizer: boolean;
  isParticipant: boolean;
};

export const getEventFooterMode = ({
  isEventPlanned,
  isOrganizer,
  isParticipant,
}: Params): EventFooterMode => {
  if (!isEventPlanned) return EventFooterMode.IN_PROCESS;
  if (isOrganizer) return EventFooterMode.ORGANIZER;
  if (isParticipant) return EventFooterMode.PARTICIPANT;
  return EventFooterMode.GUEST;
};
