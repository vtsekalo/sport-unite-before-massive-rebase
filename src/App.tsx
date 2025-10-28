import { StrictMode } from 'react';
import { Provider } from 'react-redux';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { store } from '@app/lib/store';
import { Routers } from '@app/routes/Routers';
import { theme } from '@shared/config/theme';

const isMobile = window.innerWidth < 600;

export const App = () => {
  return (
    <StrictMode>
      <ThemeProvider theme={theme(isMobile)}>
        <Provider store={store}>
          <CssBaseline />
          <Routers />
        </Provider>
      </ThemeProvider>
    </StrictMode>
  );
};
