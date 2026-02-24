import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button } from '@mui/material';

import { IEventDetailed, ROUTES } from '@shared/lib';

interface CopyEventButtonProps {
  event: IEventDetailed;
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
      eventEndDate: '',
      eventEndTime: '',
    };

    navigate(ROUTES.EVENT.COPY, { state: { newEvent } });
  };

  return (
    <Button size='classicWidthAction' onClick={handleClick}>
      <ContentCopyIcon />
    </Button>
  );
};
