import { useGetMyProfileQuery } from '@shared/api';

export const useProfile = () => {
  const { data: profile, isLoading } = useGetMyProfileQuery();

  return {
    profile: profile || null,
    isLoading,
  };
};
