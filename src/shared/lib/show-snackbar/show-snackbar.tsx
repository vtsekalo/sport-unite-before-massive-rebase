import { useState } from 'react';
import ReactDOM from 'react-dom/client';

import { AlertColor } from '@mui/material';

import { Styled } from './show-snackbar.style';

const CONTAINER_ID = 'snackbar-stack';

const createContainer = () => {
  let container = document.getElementById(CONTAINER_ID);

  if (!container) {
    container = document.createElement('div');
    container.id = CONTAINER_ID;
    document.body.appendChild(container);
    const root = ReactDOM.createRoot(container);
    root.render(<Styled.StackContainer id={`${CONTAINER_ID}-inner`} />);
  }

  return document.getElementById(`${CONTAINER_ID}-inner`) || container;
};

export const showSnackbar = (
  message: string,
  severity: AlertColor = 'error',
) => {
  const container = createContainer();
  const mountPoint = document.createElement('div');
  container.appendChild(mountPoint);

  const root = ReactDOM.createRoot(mountPoint);

  const Toast = () => {
    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(false);

    return (
      <Styled.Toast
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        slotProps={{
          transition: {
            onExited: () => {
              setTimeout(() => {
                root.unmount();
                mountPoint.remove();
              }, 0);
            },
          },
        }}
      >
        <Styled.Notification
          severity={severity}
          variant='filled'
          onClose={handleClose}
        >
          {message}
        </Styled.Notification>
      </Styled.Toast>
    );
  };

  root.render(<Toast />);
};
