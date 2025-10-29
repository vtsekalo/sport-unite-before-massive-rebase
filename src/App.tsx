import { StrictMode, useEffect, useMemo, useState } from 'react';
import { Provider } from 'react-redux';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { store } from '@app/lib/store';
import { Routers } from '@app/routes/Routers';
import { theme } from '@shared/config';

export const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const appTheme = useMemo(() => theme(isMobile), [isMobile]);

  return (
    <StrictMode>
      <ThemeProvider theme={appTheme}>
        <Provider store={store}>
          <CssBaseline />
          <Routers />
        </Provider>
      </ThemeProvider>
    </StrictMode>
  );
};
