import { useState } from 'react';
import ReactDOM from 'react-dom/client';

import { AlertColor } from '@mui/material';

import { Styled } from './show-snackbar.style';

const CONTAINER_ID = 'snackbar-stack';
const INNER_CONTAINER_ID = 'snackbar-stack-inner';

const outerContainer = document.createElement('div');
outerContainer.id = CONTAINER_ID;
document.body.appendChild(outerContainer);

const stackRoot = ReactDOM.createRoot(outerContainer);
stackRoot.render(<Styled.StackContainer id={INNER_CONTAINER_ID} />);

const getContainer = () => {
  return document.getElementById(INNER_CONTAINER_ID) || outerContainer;
};

export const showSnackbar = (
  message: string,
  severity: AlertColor = 'error',
) => {
  const container = getContainer();
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
