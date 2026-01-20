import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '@shared/lib';

export const useActiveButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(location.pathname);

  useEffect(() => {
    if (
      location.pathname !== ROUTES.HOME &&
      location.pathname !== ROUTES.LIST
    ) {
      setActiveButton(location.pathname);
    }
  }, [location.pathname]);

  const handleNavigate = (path: string) => {
    if (path === location.pathname) {
      navigate(ROUTES.HOME);
      setActiveButton(ROUTES.HOME);
      return;
    }

    navigate(path);
    setActiveButton(path);
  };

  return { activeButton, setActiveButton, handleNavigate };
};
