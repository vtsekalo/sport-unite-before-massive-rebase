import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SuggestionItem, TwoGisApiResponse } from '@shared/lib';

import { TWO_GIS_API_BASE_URL } from './api-endpoints';

const MAP_API_KEY = import.meta.env.VITE_2GIS_MAP_API_KEY;

export const geoApi = createApi({
  reducerPath: 'geoApi',
  baseQuery: fetchBaseQuery({ baseUrl: TWO_GIS_API_BASE_URL }),
  endpoints: (builder) => ({
    get2GisSuggestions: builder.query<SuggestionItem[], string>({
      query: (searchQuery) => ({
        url: '/items',
        method: 'GET',
        params: {
          q: searchQuery,
          key: MAP_API_KEY,
          locale: 'ru_RU',
          fields: 'items.point,items.adm_div',
        },
      }),
      transformResponse: (response: TwoGisApiResponse): SuggestionItem[] => {
        const items = response.result?.items;
        if (!items) return [];

        return items.map((item) => {
          const cityData = item.adm_div?.find(
            (div) => div.type === 'city' || div.type === 'settlement',
          );

          return {
            id: item.id,
            name: item.name || item.full_name || '',
            full_name: item.full_name || '',
            address_name: item.address_name || item.name || '',
            point: item.point || { lat: 0, lon: 0 },
            city: cityData?.name || '',
          };
        });
      },
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useLazyGet2GisSuggestionsQuery } = geoApi;
