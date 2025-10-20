import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useActiveButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== '/' && location.pathname !== '/list') {
      setActiveButton(location.pathname);
    }
  }, [location.pathname]);

  const handleNavigate = useCallback(
    (path: string) => {
      navigate(path);
      setActiveButton(path);
    },
    [navigate],
  );

  return { activeButton, setActiveButton, handleNavigate };
};
