import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const logEnv = () => {
  console.log('======= ENV VALUES =======');
  console.log('MODE:', import.meta.env.MODE);
  console.log('DEV:', import.meta.env.DEV);
  console.log('PROD:', import.meta.env.PROD);
  console.log('VITE_USE_MOCKS:', import.meta.env.VITE_USE_MOCKS);
  console.log('VITE_BASE_URL:', import.meta.env.VITE_BASE_URL);
  console.log('VITE_MSW_DEBUG:', import.meta.env.VITE_MSW_DEBUG);
  console.log('==========================');
};

const getBaseUrl = () => {
  if (import.meta.env.VITE_USE_MOCKS === 'true') {
    return '';
  }

  return import.meta.env.VITE_BASE_URL || '';
};

const debugBaseQuery: typeof fetchBaseQuery = (opts) => {
  const rawBaseQuery = fetchBaseQuery(opts);

  return async (args, api, extraOptions) => {
    console.log('================ API DEBUG ================');

    logEnv();
    console.log('[REQUEST args]:', args);

    const result = await rawBaseQuery(args, api, extraOptions);
    console.log(
      '[FINAL URL]:',
      result?.meta?.request?.url || '(нет meta.request.url)',
    );

    console.log('===========================================');

    return result;
  };
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: debugBaseQuery({
    baseUrl: getBaseUrl(),
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Profile'],
  endpoints: () => ({}),
});
