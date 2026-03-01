import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { App } from './app';
import './index.css';

async function bootstrap() {
  const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

  if (import.meta.env.DEV && useMocks) {
    try {
      const { worker } = await import('./mocks/browser');
      await worker.start({ onUnhandledRequest: 'bypass' });
      console.log('[MSW] worker started (mock mode ON)');
    } catch (err) {
      console.error('[MSW] failed to start', err);
    }
  } else {
    console.log('[MSW] mock mode OFF — using real API');
  }

  createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
}

bootstrap();
