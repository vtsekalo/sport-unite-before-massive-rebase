import { useEffect, useState } from 'react';
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

  const handleNavigate = (path: string) => {
    if (path === location.pathname) {
      navigate('/');
      setActiveButton('/');
      return;
    }

    navigate(path);
    setActiveButton(path);
  };

  return { activeButton, setActiveButton, handleNavigate };
};
