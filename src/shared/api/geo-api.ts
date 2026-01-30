import { SuggestionItem, TwoGisApiItem, TwoGisApiResponse } from '@shared/lib';

import { TWO_GIS_API_BASE_URL } from './api-endpoints';
import { baseApi } from './base-api';

const MAP_API_KEY = import.meta.env.VITE_2GIS_MAP_API_KEY;

export const geoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    get2GisSuggestions: builder.query<SuggestionItem[], string>({
      query: (searchQuery) => ({
        url: TWO_GIS_API_BASE_URL,
        method: 'GET',
        params: {
          q: searchQuery,
          key: MAP_API_KEY,
          locale: 'ru_RU',
          fields: 'items.point',
        },
      }),
      transformResponse: (response: TwoGisApiResponse): SuggestionItem[] => {
        return (
          response.result?.items?.map((item: TwoGisApiItem) => ({
            id: item.id,
            name: item.name || item.full_name || '',
            full_name: item.full_name || item.name || '',
            address_name: item.address_name || item.full_name || '',
            point: item.point || { lat: 0, lon: 0 },
          })) || []
        );
      },
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useLazyGet2GisSuggestionsQuery } = geoApi;
