import { FC } from 'react';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import MailIcon from '@mui/icons-material/Mail';
import { Box, Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

import { CancelEventButton } from '@features/cancel-event';
import { CopyEventButton } from '@features/copy-event-button';
import { ExitEventButton } from '@features/exit-event';
import { JoinEventButton } from '@features/join-event';
import {
  EventFooterMode,
  EventStatus,
  IEvent,
  useIsEventInProcess,
} from '@shared/lib';
import { getEventFooterMode } from '@widgets/event-card';

type EventCardFooterProps = {
  event: IEvent;
  eventId: string;
  eventStatus: EventStatus;
  isOrganizer: boolean;
  eventStartDate: string;
  isParticipant: boolean;
  hasFreeSlots: boolean;
  isError: boolean;
  onCanceled: () => void;
};

export const EventCardFooter: FC<EventCardFooterProps> = ({
  event,
  eventId,
  eventStatus,
  isOrganizer,
  isParticipant,
  hasFreeSlots,
  onCanceled,
  isError,
}) => {
  const footerMode: EventFooterMode = getEventFooterMode({
    eventStatus,
    isOrganizer,
    isParticipant,
  });

  const isProcess = useIsEventInProcess(event);

  const components = {
    [EventFooterMode.ORGANIZER]: (
      <CancelEventButton
        eventId={eventId}
        onCanceled={onCanceled}
        isProcess={isProcess}
      />
    ),
    [EventFooterMode.PARTICIPANT]: <ExitEventButton eventId={eventId} />,
    [EventFooterMode.GUEST]: (
      <JoinEventButton
        eventId={eventId}
        hasFreeSlots={hasFreeSlots}
        isError={isError}
        isParticipant={isParticipant}
        isProcess={isProcess}
      />
    ),
    [EventFooterMode.COMPLETED]: (
      <Button
        disabled
        variant='contained'
        size='fullWidthAction'
        startIcon={<CheckCircleRoundedIcon />}
        loadingPosition='start'
      >
        ЗАВЕРШЕНО
      </Button>
    ),
  };

  return (
    <Box flex={'flex'}>
      <Stack gap={1.25} alignItems={'center'}>
        <Box
          mt={{ xs: 'auto', md: 0 }}
          display='flex'
          justifyContent='center'
          gap={1.25}
        >
          {isOrganizer && <CopyEventButton event={event} />}

          {components[footerMode]}

          <Button
            variant='contained'
            size='classicWidthAction'
            disabled={!(isParticipant || isOrganizer)}
          >
            <MailIcon />
          </Button>
        </Box>

        {!isProcess && (
          <Typography
            variant='body2'
            color='text.disabled'
            fontSize='12px'
            mr={1}
          >
            Событие началось.
          </Typography>
        )}
      </Stack>
    </Box>
  );
};
