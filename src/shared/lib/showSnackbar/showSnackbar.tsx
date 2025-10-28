import ReactDOM from 'react-dom/client';

import { Alert, Box, Snackbar } from '@mui/material';

export function showSnackbar(
  message: string,
  type: 'success' | 'error' | 'info' | 'warning' = 'info',
) {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const root = ReactDOM.createRoot(div);

  const handleClose = () => {
    root.unmount();
    div.remove();
  };

  root.render(
    <Snackbar
      open
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Box width={'100%'}>
        <Alert onClose={handleClose} severity={type} variant='filled'>
          {message}
        </Alert>
      </Box>
    </Snackbar>,
  );
}
