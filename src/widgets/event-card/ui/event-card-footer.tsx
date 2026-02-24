import { FC } from 'react';

import MailIcon from '@mui/icons-material/Mail';
import { Box, Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

import { CancelEventButton } from '@features/cancel-event';
import { CopyEventButton } from '@features/copy-event-button';
import { ExitEventButton, canExitEvent } from '@features/exit-event';
import { JoinEventButton } from '@features/join-event';
import { EventFooterMode, EventStatus, IEventDetailed } from '@shared/lib';
import { getEventFooterMode } from '@widgets/event-card';

type Props = {
  event: IEventDetailed;
  eventStatus: EventStatus;
  isOrganizer: boolean;
  eventStartDate: string;
  isParticipant: boolean;
  hasFreeSlots: boolean;
  isError: boolean;
  onCanceled: () => void;
};

export const EventCardFooter: FC<Props> = ({
  event,
  eventStatus,
  eventStartDate,
  isOrganizer,
  isParticipant,
  hasFreeSlots,
  onCanceled,
  isError,
}) => {
  const footerMode: EventFooterMode = getEventFooterMode({
    isEventPlanned: eventStatus === EventStatus.PLANNED,
    isOrganizer,
    isParticipant,
  });

  const components = {
    [EventFooterMode.IN_PROCESS]: (
      <Box flex={1} display='flex' justifyContent='center'>
        <Typography>Событие уже идет</Typography>
      </Box>
    ),
    [EventFooterMode.ORGANIZER]: (
      <CancelEventButton eventId={event.eventId} onCanceled={onCanceled} />
    ),
    [EventFooterMode.PARTICIPANT]: (
      <ExitEventButton
        eventId={event.eventId}
        eventStartDate={eventStartDate}
      />
    ),
    [EventFooterMode.GUEST]: (
      <JoinEventButton
        eventId={event.eventId}
        hasFreeSlots={hasFreeSlots}
        isError={isError}
        isParticipant={isParticipant}
      />
    ),
  };

  return (
    <>
      <Stack gap={1.25}>
        <Box
          mt={{ xs: 'auto', md: 0 }}
          display='flex'
          justifyContent='center'
          gap={1.25}
        >
          {isOrganizer && <CopyEventButton event={event} />}

          {components[footerMode]}

          {(isOrganizer || isParticipant) && (
            <Button variant='contained' size='classicWidthAction'>
              <MailIcon />
            </Button>
          )}
        </Box>
        {isParticipant && !canExitEvent(eventStartDate) && (
          <Typography
            color='text.secondary'
            fontSize='12px'
            lineHeight={1.25}
            textAlign='center'
            width='100%'
            whiteSpace='pre-line'
          >
            Нельзя покинуть событие{'\n'}менее чем за 6 часов до начала события.
          </Typography>
        )}
      </Stack>
    </>
  );
};
