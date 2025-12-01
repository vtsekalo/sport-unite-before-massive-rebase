import { useGetMyProfileQuery } from '@shared/api';

export const useProfile = () => {
  const { data: profile, isLoading, error } = useGetMyProfileQuery();

  return {
    profile,
    isLoading,
    error,
    isError: !!error,
  };
};
