import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { ModalWrapper } from '@entities/modal-wrapper';

export const ProfilePage: FC = () => {
  const { pathname } = useLocation();
  const isDeletedView = pathname.includes('deleted');

  return (
    <ModalWrapper
      height={{ xs: isDeletedView ? 'auto' : '100%', md: '100%' }}
      py={{ xs: 2, md: 5 }}
      px={{ xs: 2, md: 10 }}
      gap={{ xs: 2, md: 3 }}
    >
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Typography
          fontWeight='bold'
          fontSize={{ xs: '20px', md: '24px' }}
          lineHeight={1.6}
        >
          Профиль
        </Typography>
      </Box>
      <Box display='flex' alignItems='start' flex={1} width='100%'>
        <Outlet />
      </Box>
    </ModalWrapper>
  );
};
