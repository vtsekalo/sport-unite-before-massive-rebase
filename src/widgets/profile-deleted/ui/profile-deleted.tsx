import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';

import { ROUTES, useProfileDeletionGuard } from '@shared/lib';

export const ProfileDeleted: FC = () => {
  useProfileDeletionGuard();
  const navigate = useNavigate();
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      gap={5}
      pt={{ xs: '24px', md: '0px' }}
      mb={{ md: '80px' }}
    >
      <Typography fontWeight={700} fontSize={{ xs: '14px', md: '24px' }}>
        Ваш профиль удалён.
      </Typography>
      <Button
        size='mediumFixed'
        variant='contained'
        onClick={() => navigate(ROUTES.HOME)}
      >
        Перейти на главную страницу
      </Button>
    </Box>
  );
};
