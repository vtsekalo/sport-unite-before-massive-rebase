import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

worker.events.on('request:start', ({ request }) => {
  console.log(
    '[MSW:common-event-card-list] Request started:',
    request.method,
    request.url,
  );
});

worker.events.on('request:match', ({ request }) => {
  console.log('[MSW:common-event-card-list] Request matched:', request.url);
});

worker.events.on('request:unhandled', ({ request }) => {
  console.warn(
    '[MSW:common-event-card-list] Request unhandled:',
    request.method,
    request.url,
  );
});

worker.events.on('response:mocked', ({ request }) => {
  console.log('[MSW:common-event-card-list] Response mocked for:', request.url);
});

if (import.meta.env.VITE_MSW_DEBUG === 'true') {
  worker.events.on('request:start', ({ request }) => {
    console.log(
      '[MSW:common-event-card-list] outgoing',
      request.method,
      request.url,
    );
  });
  worker.events.on('request:match', ({ request }) => {
    console.log('[MSW:common-event-card-list] matched', request.url);
  });
  worker.events.on('request:unhandled', ({ request }) => {
    console.warn(
      '[MSW:common-event-card-list] unhandled',
      request.method,
      request.url,
    );
  });
  worker.events.on('response:mocked', ({ request }) => {
    console.log(
      '[MSW:common-event-card-list] response mocked for',
      request.url,
    );
  });
  worker.events.on('response:bypass', ({ request }) => {
    console.log(
      '[MSW:common-event-card-list] response bypassed for',
      request.url,
    );
  });
}
