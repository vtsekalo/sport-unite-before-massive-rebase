import { FC, useState } from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';

import { useExitEventMutation } from '../api/exit-event-api';
import { ExitEventConfirmModal } from './exit-event-confirm-modal';

type ExitEventButtonProps = {
  eventId: string | undefined;
  disabled?: boolean;
};

export const ExitEventButton: FC<ExitEventButtonProps> = ({
  eventId,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [exitEvent, { isLoading }] = useExitEventMutation();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    if (isLoading) return;
    setIsOpen(false);
  };

  const handleConfirm = async () => {
    if (!eventId) return;

    await exitEvent(eventId);
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant='contained'
        onClick={handleOpen}
        disabled={disabled || isLoading}
        startIcon={<LogoutIcon />}
        size='fullWidthAction'
      >
        ПОКИНУТЬ СОБЫТИЕ
      </Button>

      <ExitEventConfirmModal
        open={isOpen}
        isLoading={isLoading}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </>
  );
};
