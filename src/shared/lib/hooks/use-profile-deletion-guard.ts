// src/shared/lib/hooks/use-profile-deletion-guard.ts
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../constants';

const DELETION_FLAG_KEY = 'profile_deletion_allowed';

export const useProfileDeletionGuard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isAllowed = sessionStorage.getItem(DELETION_FLAG_KEY) === 'true';
    if (!isAllowed) {
      navigate(ROUTES.PROFILE.INDEX, { replace: true });
    }
  }, [navigate]);

  return null;
};

export const setDeletionAccess = () => {
  sessionStorage.setItem(DELETION_FLAG_KEY, 'true');
};

export const hasDeletionAccess = (): boolean => {
  return sessionStorage.getItem(DELETION_FLAG_KEY) === 'true';
};

export const clearDeletionAccess = () => {
  sessionStorage.removeItem(DELETION_FLAG_KEY);
};
