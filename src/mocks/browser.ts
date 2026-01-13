import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

worker.events.on('request:start', ({ request }) => {
  console.log('[MSW:event] Request started:', request.method, request.url);
});

worker.events.on('request:match', ({ request }) => {
  console.log('[MSW:event] Request matched:', request.url);
});

worker.events.on('request:unhandled', ({ request }) => {
  console.warn('[MSW:event] Request unhandled:', request.method, request.url);
});

worker.events.on('response:mocked', ({ request }) => {
  console.log('[MSW:event] Response mocked for:', request.url);
});

if (import.meta.env.VITE_MSW_DEBUG === 'true') {
  worker.events.on('request:start', ({ request }) => {
    console.log('[MSW:event] outgoing', request.method, request.url);
  });
  worker.events.on('request:match', ({ request }) => {
    console.log('[MSW:event] matched', request.url);
  });
  worker.events.on('request:unhandled', ({ request }) => {
    console.warn('[MSW:event] unhandled', request.method, request.url);
  });
  worker.events.on('response:mocked', ({ request }) => {
    console.log('[MSW:event] response mocked for', request.url);
  });
  worker.events.on('response:bypass', ({ request }) => {
    console.log('[MSW:event] response bypassed for', request.url);
  });
}
