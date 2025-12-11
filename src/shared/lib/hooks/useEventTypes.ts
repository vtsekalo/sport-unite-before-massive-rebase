import { useGetTypeEventsQuery } from '@shared/api/eventApi';

export const useEventTypes = () => {
  const { data, isLoading, error, refetch } = useGetTypeEventsQuery();

  return {
    eventTypes: data || [],
    isLoading,
    error,
    refetch,
  };
};
