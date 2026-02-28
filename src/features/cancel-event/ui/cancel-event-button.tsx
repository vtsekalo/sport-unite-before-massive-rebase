import { FC, useState } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import { Button } from '@mui/material';

import { CancelEventConfirmModal } from '@features/cancel-event/';

import { useDeleteEventMutation } from '../api/delete-event-api';

type CancelEventButtonProps = {
  eventId: string | undefined;
  disabled?: boolean;
  onCanceled: () => void;
  isProcess: boolean;
};

export const CancelEventButton: FC<CancelEventButtonProps> = ({
  eventId,
  disabled = false,
  onCanceled,
  isProcess,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteEvent, { isLoading }] = useDeleteEventMutation();

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = async () => {
    if (!eventId) return;

    const result = await deleteEvent(eventId);

    if (result?.data) {
      onCanceled();
    }
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant='contained'
        size='fullWidthAction'
        onClick={handleOpen}
        disabled={disabled || isOpen || isLoading || !isProcess}
        startIcon={<CancelIcon />}
      >
        ОТМЕНИТЬ СОБЫТИЕ
      </Button>

      <CancelEventConfirmModal
        open={isOpen}
        isLoading={isLoading}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </>
  );
};
