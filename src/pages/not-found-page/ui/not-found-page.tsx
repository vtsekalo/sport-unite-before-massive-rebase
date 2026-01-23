import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';

import { ROUTES } from '@shared/lib';

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height='60vh'
    >
      <Typography variant='h1' fontWeight={700}>
        404
      </Typography>
      <Typography variant='h5' mb={4}>
        Страница не найдена
      </Typography>
      <Button variant='contained' onClick={() => navigate(ROUTES.HOME)}>
        Вернуться на главную
      </Button>
    </Box>
  );
};
