import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES, useProfile } from '@shared/lib';

export const useToggleNavigate = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useProfile({ __meta: { toast: false } });

  return (path: string, isProtected = true) => {
    if (isProtected && !isAuthenticated) {
      navigate(ROUTES.AUTH);
      return;
    }

    navigate(pathname === path ? ROUTES.HOME : path);
  };
};
