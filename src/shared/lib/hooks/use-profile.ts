import { useGetMyProfileQuery } from '@shared/api';

export const useProfile = () => {
  const { data: profile, isLoading, error, ...rest } = useGetMyProfileQuery({});

  const isAuthError = error && 'status' in error && error?.status === 401;

  return {
    profile,
    isLoading,
    error,
    isAuthError,
    ...rest,
  };
};
