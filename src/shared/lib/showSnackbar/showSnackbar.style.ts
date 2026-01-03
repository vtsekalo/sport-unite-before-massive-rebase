import styled from 'styled-components';

import { Alert, AlertProps, Snackbar, SnackbarProps } from '@mui/material';

const Toast = styled(Snackbar)<SnackbarProps>(() => ({
  '&&': {
    position: 'static',
    transform: 'none',
  },
}));

const Notification = styled(Alert)<AlertProps>(() => ({
  width: '100%',
  borderRadius: '12px',
}));

const StackContainer = styled('div')(() => ({
  position: 'fixed',
  top: '24px',
  right: '24px',
  zIndex: 2000,
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '350px',
  pointerEvents: 'none',
  '& > *': {
    pointerEvents: 'auto',
  },
}));

export const Styled = {
  Toast,
  Notification,
  StackContainer,
};
