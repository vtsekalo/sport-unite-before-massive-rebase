import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '../constants';
import { profileDeletionStorage } from './profile-deletion-storage';

export const DeletionGuard: FC = () => {
  if (!profileDeletionStorage.get()) {
    return <Navigate to={ROUTES.HOME} replace />;
  }
  return <Outlet />;
};
