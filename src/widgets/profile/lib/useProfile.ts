import { useGetProfileQuery } from '@shared/api';

export const useProfile = (
  userId: string = '72f9124c-12f4-434e-a2e7-77ac3780adf9',
) => {
  const { data: profile, isLoading } = useGetProfileQuery(userId);

  return {
    profile: profile || null,
    isLoading,
  };
};
