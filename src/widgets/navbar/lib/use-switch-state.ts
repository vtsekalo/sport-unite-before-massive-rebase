import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '@shared/lib';

export const useSwitchState = (setActiveButton: (path: string) => void) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [lastTogglePosition, setLastTogglePosition] = useState<string>(() => {
    if (location.pathname === ROUTES.LIST) return ROUTES.LIST;
    return ROUTES.HOME;
  });

  useEffect(() => {
    if (
      location.pathname === ROUTES.HOME ||
      location.pathname === ROUTES.LIST
    ) {
      setLastTogglePosition(location.pathname);
    }
  }, [location.pathname]);

  const checked = lastTogglePosition === ROUTES.LIST;

  const handleSwitchChange = useCallback(() => {
    const newPath = checked ? ROUTES.HOME : ROUTES.LIST;
    setLastTogglePosition(newPath);
    navigate(newPath);
    setActiveButton(newPath);
  }, [checked, navigate, setActiveButton]);

  return { checked, handleSwitchChange };
};
