import { useGetMyProfileQuery } from '@shared/api/baseApi';

export const useProfile = () => {
  const { data: profile, isLoading, error } = useGetMyProfileQuery();

  return {
    profile,
    isLoading,
    error,
    isError: !!error,
  };
};
