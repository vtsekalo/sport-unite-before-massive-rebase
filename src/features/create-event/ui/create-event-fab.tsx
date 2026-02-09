import React from 'react';
import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';

import { ROUTES } from '@shared/lib';
import { useProfile } from '@shared/lib/hooks';

import { StyledFab } from './create-event-fab.styled';

export const CreateEventFab: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useProfile({ __meta: { toast: false } });

  const handleClick = () => {
    if (!isAuthenticated) {
      navigate(ROUTES.AUTH);
      return;
    }

    navigate(ROUTES.ADD_EVENT);
  };

  return (
    <StyledFab
      color='primary'
      onClick={handleClick}
      aria-label='создать событие'
    >
      <AddIcon fontSize='large' />
    </StyledFab>
  );
};
