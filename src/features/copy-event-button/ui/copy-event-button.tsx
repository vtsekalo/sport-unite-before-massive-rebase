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
    navigate(ROUTES.EVENT.COPY(event.eventId));
  };

  return (
    <Button variant='contained' size='classicWidthAction' onClick={handleClick}>
      <ContentCopyIcon />
    </Button>
  );
};
