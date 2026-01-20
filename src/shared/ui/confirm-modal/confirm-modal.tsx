import { FC } from 'react';

import { DialogProps } from '@mui/material';

import { Styled } from './confirm-modal.styled';

interface ConfirmModalProps extends DialogProps {
  disableClose?: boolean;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  open,
  onClose,
  children,
  disableClose = false,
  ...props
}) => {
  return (
    <Styled.ConfirmModal
      open={open}
      onClose={(event, reason) => {
        if (disableClose && reason === 'backdropClick') return;
        onClose?.(event, reason);
      }}
      disableEscapeKeyDown={disableClose}
      {...props}
    >
      {children}
    </Styled.ConfirmModal>
  );
};
