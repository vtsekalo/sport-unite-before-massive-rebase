import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useProfile } from '@shared/lib';
import { ROUTES } from '@shared/lib';

export const ProtectedRoute: FC = () => {
  const { isAuthenticated, isLoading } = useProfile({
    __meta: { toast: false },
  });

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH} replace />;
  }

  return <Outlet />;
};
