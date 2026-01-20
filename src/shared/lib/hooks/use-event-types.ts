import { useGetTypeEventsQuery } from '@shared/api/event-api';

export const useEventTypes = () => {
  const { data, isLoading, error, refetch } = useGetTypeEventsQuery();

  return {
    eventTypes: data || [],
    isLoading,
    error,
    refetch,
  };
};
