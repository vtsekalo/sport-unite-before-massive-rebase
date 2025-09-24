import { StrictMode } from 'react';

// import { Provider } from 'react-redux';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// import { store } from '@app/lib/store';
import { Routers } from '@app/ui/Roters';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

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

export default App;
