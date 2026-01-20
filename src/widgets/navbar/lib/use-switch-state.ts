import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '@shared/lib';

export const useSwitchState = (setActiveButton: (path: string) => void) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [checked, setChecked] = useState(location.pathname === ROUTES.LIST);

  const handleSwitchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;

      if (
        location.pathname !== ROUTES.HOME &&
        location.pathname !== ROUTES.LIST
      ) {
        const currentPath = checked ? ROUTES.LIST : ROUTES.HOME;
        navigate(currentPath);
        setActiveButton(currentPath);
        return;
      }

      setChecked(newChecked);
      const newPath = newChecked ? ROUTES.LIST : ROUTES.HOME;
      navigate(newPath);
      setActiveButton(newPath);
    },
    [checked, location.pathname, navigate, setActiveButton],
  );

  return { checked, handleSwitchChange };
};
