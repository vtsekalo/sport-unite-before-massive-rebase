import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, useTheme } from '@mui/material';

import { ROUTES } from '@shared/lib';

export const LoginButton: FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      position='absolute'
      display={'flex'}
      bottom={40}
      zIndex={20}
      boxShadow={theme.shadows[2]}
      borderRadius={'10px'}
      width={'100%'}
      maxWidth={188}
    >
      <Button
        variant={'contained'}
        size={'adaptive'}
        fullWidth
        onClick={() => navigate(ROUTES.AUTH)}
      >
        Войти
      </Button>
    </Box>
  );
};
