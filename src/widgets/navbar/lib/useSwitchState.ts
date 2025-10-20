import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useSwitchState = (setActiveButton: (path: string) => void) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [checked, setChecked] = useState(location.pathname === '/list');

  const handleSwitchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;

      if (location.pathname !== '/' && location.pathname !== '/list') {
        const currentPath = checked ? '/list' : '/';
        navigate(currentPath);
        setActiveButton(currentPath);
        return;
      }

      setChecked(newChecked);
      const newPath = newChecked ? '/list' : '/';
      navigate(newPath);
      setActiveButton(newPath);
    },
    [checked, location.pathname, navigate, setActiveButton],
  );

  return { checked, handleSwitchChange };
};
