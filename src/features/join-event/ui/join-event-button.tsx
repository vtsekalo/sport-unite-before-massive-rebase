import { useEffect, useState } from 'react';

import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Button } from '@mui/material';

import { useJoinInEventsMutation } from '../api/join-event-api.ts';

type Props = {
  eventId?: string;
  isError: boolean;
  hasFreeSlots: boolean;
  isParticipant: boolean;
};

export const JoinEventButton = ({
  eventId,
  hasFreeSlots,
  isError,
  isParticipant,
}: Props) => {
  const [joinEvent, { isLoading: isLoadingJoin }] = useJoinInEventsMutation();

  const [isWaitingForParticipant, setIsWaitingForParticipant] = useState(false);

  useEffect(() => {
    setIsWaitingForParticipant(false);
  }, [eventId]);

  useEffect(() => {
    if (isParticipant || isError) {
      setIsWaitingForParticipant(false);
    }
  }, [isParticipant, isError]);

  const handleJoinEvent = async () => {
    if (!eventId || isWaitingForParticipant) return;

    setIsWaitingForParticipant(true);
    await joinEvent(eventId);
  };

  const isLoading = !hasFreeSlots || isLoadingJoin || isWaitingForParticipant;

  return (
    <Button
      variant='contained'
      size='fullWidthAction'
      disabled={isLoading}
      onClick={handleJoinEvent}
      loading={isLoadingJoin}
      startIcon={<PlayCircleOutlineIcon />}
      loadingPosition='start'
    >
      Присоединиться
    </Button>
  );
};
