import { FC, useState } from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button } from '@mui/material';

import { IEventDetailed } from '@shared/lib';

import { CopyEventModal } from './copy-event-modal';

interface CopyEventButtonProps {
  event: IEventDetailed;
}

export const CopyEventButton: FC<CopyEventButtonProps> = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button size='classicWidthAction' onClick={() => setIsOpen(true)}>
        <ContentCopyIcon />
      </Button>

      <CopyEventModal
        event={event}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
