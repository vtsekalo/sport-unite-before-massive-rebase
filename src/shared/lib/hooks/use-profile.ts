import { useGetMyProfileQuery } from '@shared/api';

export const useProfile = (params = {}) => {
  const {
    data: profile,
    isLoading,
    error,
    ...rest
  } = useGetMyProfileQuery(params);

  const isAuthError = error && 'status' in error && error?.status === 401;

  const isAuthenticated = !!profile;

  return {
    profile,
    isLoading,
    error,
    isAuthError,
    isAuthenticated,
    ...rest,
  };
};
