import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button } from '@mui/material';

import { IEvent, ROUTES } from '@shared/lib';

interface CopyEventButtonProps {
  event: IEvent;
}

export const CopyEventButton: FC<CopyEventButtonProps> = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const newEvent = {
      eventName: event.eventName,
      eventDescription: event.eventDescription,
      eventLocation: event.eventLocation,
      eventType: event.eventType,
      countUsers: event.countUsers,
      eventPhoto: event.eventPhoto,
      coordinates: event.coordinates,
      eventStartDate: '',
      eventStartTime: '',
      eventEndTime: '',
    };

    navigate(ROUTES.COPY_EVENT, { state: { newEvent } });
  };

  return (
    <Button variant='contained' size='classicWidthAction' onClick={handleClick}>
      <ContentCopyIcon />
    </Button>
  );
};
