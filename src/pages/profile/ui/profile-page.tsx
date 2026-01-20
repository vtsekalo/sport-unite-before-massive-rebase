import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { ModalWrapper } from '@entities/modal-wrapper';

export const ProfilePage: FC = () => {
  const { pathname } = useLocation();
  const isDeletedView = pathname.includes('deleted');

  return (
    <ModalWrapper height={{ xs: isDeletedView ? 'auto' : '100%', md: '100%' }}>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        pt={{ xs: 2, md: 5 }}
      >
        <Typography
          fontWeight='bold'
          fontSize={{ xs: '20px', md: '24px' }}
          lineHeight={1.6}
        >
          Профиль
        </Typography>
      </Box>

      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flex={1}
        py={2}
        width='100%'
      >
        <Outlet />
      </Box>
    </ModalWrapper>
  );
};
