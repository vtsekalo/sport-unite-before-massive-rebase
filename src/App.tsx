import { StrictMode } from 'react';

// import { Provider } from 'react-redux';

import { CssBaseline, ThemeProvider } from '@mui/material';

// import { store } from '@app/lib/store';
import { Routers } from '@app/routes/Routers';
import { theme } from '@shared/config/theme';

export const App = () => {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        {/* <Provider store={store}> */}
        <CssBaseline />
        <Routers />
        {/* </Provider> */}
      </ThemeProvider>
    </StrictMode>
  );
};
